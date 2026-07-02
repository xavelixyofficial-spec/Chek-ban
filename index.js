const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 2260;

// Konfigurasi API Gateway Anda (Cari provider API WA)
const WA_API_URL = 'https://api.fonnte.com/check'; // Contoh URL API
const WA_TOKEN = 'MtpMAr2wPQBeY6yedJKR';

const bot = new TelegramBot('8827364446:AAE4L5txlq9TFJtycBMEW9UV3DARZEAdHlI', { polling: true });

// Endpoint API Checker
app.get('/api/check', async (req, res) => {
    const { nomor } = req.query;
    try {
        const response = await axios.post(WA_API_URL, {
            phone: nomor,
            type: 'check'
        }, { headers: { 'Authorization': WA_TOKEN } });

        res.json({ status: response.data.registered ? "AKTIF" : "TIDAK AKTIF" });
    } catch (e) {
        res.status(500).json({ status: "ERROR" });
    }
});

app.listen(PORT, () => console.log(`Sistem API berjalan di port ${PORT}`));
