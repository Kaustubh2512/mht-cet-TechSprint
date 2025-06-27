import { Request, Response } from 'express';
import { getAllColleges, findCollegeByCodeOrName } from '../utils/collegeDetails';
import axios from 'axios';

export async function getCollegesList(req: Request, res: Response) {
  try {
    const colleges = await getAllColleges();
    // Only send minimal info for dropdown
    const minimal = colleges.map(c => ({
      college_code: c.college_code,
      name: c.name,
      region: c.region,
      district: c.district,
      home_university: c.home_university,
    }));
    res.json({ success: true, colleges: minimal });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load colleges' });
  }
}

export async function getCollegeAIInfo(req: Request, res: Response) {
  const { college_code, name } = req.body;
  if (!college_code && !name) {
    return res.status(400).json({ success: false, message: 'college_code or name required' });
  }
  try {
    const college = await findCollegeByCodeOrName(college_code || name);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }
    // --- DeepSeek AI integration ---
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'DeepSeek API key not configured' });
    }
    const prompt = `Give me a detailed, up-to-date, and student-friendly overview of the following engineering college in Maharashtra. Include its full name, DTE code, location (district, region), home university, and any notable features, courses, or recent news if available.\n\nCollege: ${college.name}\nDTE Code: ${college.college_code}\nLocation: ${college.district}, ${college.region}\nHome University: ${college.home_university}`;
    const deepseekUrl = 'https://api.deepseek.com/v1/chat/completions';
    const payload = {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for college information.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 512
    };
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
    const aiResponse = await axios.post(deepseekUrl, payload, { headers });
    const aiText = aiResponse.data.choices?.[0]?.message?.content || 'No information found.';
    res.json({ success: true, info: aiText });
  } catch (err) {
    console.error('DeepSeek AI error:', err);
    res.status(500).json({ success: false, message: 'Failed to get AI info for college' });
  }
} 