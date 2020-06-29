import unittest
import hello

class TestMain(unittest.TestCase):
    def setUp(self):
        print("Set the f up.")

    def test_do_stuff(self):
        test_param = 23
        result = hello.do_stuff(test_param)
        self.assertEqual(result, 28)
    
    def test_do_stuff2(self):
        test_param = "Halton"
        result = hello.do_stuff(test_param)
        self.assertIsInstance(result, ValueError)

    def test_do_stuff3(self):
        test_param = None
        result = hello.do_stuff(test_param)
        self.assertEqual(result, "please enter a number fam!")

    def test_do_stuff4(self):
        test_param = ""
        result = hello.do_stuff(test_param)
        self.assertEqual(result, "please enter a number fam!")

    def tearDown(self):
        print("Cleaning u9")

if __name__ == "__main__":
    unittest.main()

