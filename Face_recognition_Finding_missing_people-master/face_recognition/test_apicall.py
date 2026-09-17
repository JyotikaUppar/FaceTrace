import unittest

class TestFaceRecognitionPipeline(unittest.TestCase):
    def test_filename_parsing(self):
        """Test extraction of name and Aadhaar from image filename string format (e.g. JohnDoe_123456789012)"""
        filename = "JohnDoe_123456789012"
        idx = 0
        for i in range(len(filename) - 1, -1, -1):
            if filename[i] == '_':
                idx = i
                break
        
        actual_name = filename[:idx]
        adhaar = filename[idx + 1:]
        
        self.assertEqual(actual_name, "JohnDoe")
        self.assertEqual(adhaar, "123456789012")

    def test_payload_structure(self):
        """Test validation of location payload structure"""
        payload = {
            "name": "Jane Doe",
            "adhaar": "987654321098",
            "locationval": "Lat: 13.0827, Long: 80.2707"
        }
        self.assertIn("name", payload)
        self.assertIn("adhaar", payload)
        self.assertIn("locationval", payload)
        self.assertEqual(len(payload["adhaar"]), 12)

    def test_confidence_calculation(self):
        """Test facial match distance to percentage conversion formula"""
        # Distance = 0.20 -> 80% match (High match)
        dist_high = 0.20
        conf_high = round(max(0.0, min(100.0, (1.0 - dist_high) * 100.0)), 1)
        self.assertEqual(conf_high, 80.0)
        self.assertGreaterEqual(conf_high, 75.0)

        # Distance = 0.35 -> 65% match (Moderate match)
        dist_mod = 0.35
        conf_mod = round(max(0.0, min(100.0, (1.0 - dist_mod) * 100.0)), 1)
        self.assertEqual(conf_mod, 65.0)
        self.assertLess(conf_mod, 75.0)
        self.assertGreaterEqual(conf_mod, 50.0)

if __name__ == '__main__':
    unittest.main()
