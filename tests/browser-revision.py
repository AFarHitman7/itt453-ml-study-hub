"""Optional regression: python tests/browser-revision.py (requires Playwright)."""
import os
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('ML_TEST_URL', Path(__file__).resolve().parents[1].as_uri() + '/index.html')


class RevisionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.page = self.browser.new_page()
        self.errors = []
        self.page.on('pageerror', lambda e: self.errors.append(str(e)))
        self.page.on('console', lambda m: self.errors.append(m.text) if m.type == 'error' else None)
        self.page.goto(BASE + '#pyq')
        self.page.locator('.pyq-card').first.wait_for()

    def tearDown(self):
        self.page.close()

    def test_every_occurrence_has_an_answer(self):
        self.assertEqual(self.page.locator('.occurrences > li').count(), 177)
        self.assertEqual(self.page.locator('details.pyq-answer').count(), 177)
        self.assertEqual(self.errors, [])

    def test_original_tables_are_embedded_and_enlargeable(self):
        figures = self.page.locator('figure.pyq-asset')
        self.assertGreaterEqual(figures.count(), 19)
        self.assertGreaterEqual(figures.locator('a[href] img[alt]').count(), 19)
        self.assertNotIn('[10-row table in the paper', self.page.locator('#content').inner_text())

    def test_worked_answers_reveal_real_steps(self):
        answer = self.page.locator('[data-pyq-key="n25:13a"] details.pyq-answer')
        self.assertEqual(answer.count(), 1)
        self.assertFalse(answer.evaluate('(el) => el.open'))
        answer.locator('summary').click()
        self.assertTrue(answer.evaluate('(el) => el.open'))
        self.assertGreater(answer.locator('ol > li').count(), 2)
        self.assertIn('Yes', answer.inner_text())
        # Only occurrence rows use the paper/text grid, not answer bullets.
        self.assertNotEqual(answer.locator('li').first.evaluate('(el) => getComputedStyle(el).display'), 'grid')
        answer.locator('summary').click()
        self.assertFalse(answer.evaluate('(el) => el.open'))

    def test_spotlight_has_tables_and_answers(self):
        self.page.goto(BASE + '#notes/m2-naive-bayes')
        self.page.locator('.pyqbox').wait_for()
        self.assertGreater(self.page.locator('.pyqbox .pyq-asset').count(), 0)
        self.assertGreater(self.page.locator('.pyqbox .pyq-answer').count(), 0)

    def test_mobile_and_dark_answer_content(self):
        for scheme in ['light', 'dark']:
            self.page.emulate_media(color_scheme=scheme)
            for width in [320, 390, 720, 1920]:
                self.page.set_viewport_size({'width': width, 'height': 850})
                for key in ['n25:13a', 'n25:15a', 'm24:20']:
                    card = self.page.locator(f'[data-pyq-key="{key}"]')
                    card.locator('details.pyq-answer').evaluate('(el) => el.open = true')
                    for image in card.locator('img').all():
                        image.scroll_into_view_if_needed()
                        image.evaluate('(img) => img.decode()')
                overflow = self.page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                self.assertLessEqual(overflow, 0, f'{scheme}, width {width}')
        self.assertEqual(self.errors, [])

    def test_worked_answer_finals_are_pinned(self):
        """Guards the recomputed final values of worked solutions."""
        expectations = {
            'n25:13a': ['Yes', '0.0444'],
            'n24:13a': ['senior'],
            'm24:15a': ['1.2100'],
            'n25:15a': ['0.6464'],
            'n25:14a': ['1.94'],
            'm26:6': ['0.4536'],
            'n25:19a': ['5.667', '3.333'],
            'd23:15a': ['0.3113'],
        }
        for key, needles in expectations.items():
            card = self.page.locator(f'[data-pyq-key="{key}"]')
            body = card.locator('details.pyq-answer .answer')
            body.evaluate('(el) => el.closest("details").open = true')
            text = body.inner_text()
            for needle in needles:
                self.assertIn(needle, text, f'{key} lost its computed value {needle}')
        self.assertEqual(self.errors, [])

    def test_reused_diagram_ids_do_not_collide(self):
        ids = self.page.locator('[id]').evaluate_all('(els) => els.map(e=>e.id)')
        self.assertEqual(len(ids), len(set(ids)))


if __name__ == '__main__':
    unittest.main(verbosity=2)
