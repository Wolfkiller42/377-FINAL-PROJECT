const express = require('express');
const router = express.Router();
const verifyPhone = require('../services/numverifyService');
const supabase = require('../supabase/client');

router.post('/', async (req, res) => {
  console.log('📞 /api/verify hit!');
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    const result = await verifyPhone(number);
    console.log('✅ Verification result:', result);

    await supabase.from('verifications').insert([{
      number: result.number,
      valid: result.valid,
      country: result.country_name,
      carrier: result.carrier,
      line_type: result.line_type
    }]);

    res.json(result);
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
