import { Request, Response } from 'express';
import { getAllColleges, findCollegeByCodeOrName, getAvailableDistricts, getCollegesByDistrict } from '../utils/collegeDetails';
import axios from 'axios';

export async function getCollegesList(req: Request, res: Response) {
  try {
    const colleges = await getAllColleges();
    // Only send minimal info for dropdown
    const minimal = colleges.map(c => ({
      college_code: c.college_code,
      name: c.name,
      district: c.district,
      originalDistrict: c.originalDistrict,
    }));
    res.json({ success: true, colleges: minimal });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load colleges' });
  }
}

export async function getDistrictsList(req: Request, res: Response) {
  try {
    const districts = getAvailableDistricts();
    res.json({ success: true, districts: districts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load districts' });
  }
}

export async function getCollegesByDistrictList(req: Request, res: Response) {
  try {
    const { district } = req.params;
    if (!district) {
      return res.status(400).json({ success: false, message: 'District parameter is required' });
    }
    
    const colleges = getCollegesByDistrict(district);
    const minimal = colleges.map(c => ({
      college_code: c.college_code,
      name: c.name,
      district: c.district,
      originalDistrict: c.originalDistrict,
    }));
    
    res.json({ success: true, colleges: minimal });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load colleges for district' });
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
    const prompt = `Give me a detailed, up-to-date, and student-friendly overview of the following engineering college in Maharashtra. Include its full name, DTE code, location (district), and any notable features, courses, or recent news if available.\n\nCollege: ${college.name}\nDTE Code: ${college.college_code}\nLocation: ${college.district}\nOriginal District: ${college.originalDistrict}`;
    const aiResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for college information.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://aicollegebuddy.vercel.app',
          'X-Title': 'College Info Centre'
        }
      }
    );
    const aiText = aiResponse.data.choices?.[0]?.message?.content || 'No information found.';
    res.json({ success: true, info: aiText });
  } catch (err: any) {
    console.error('DeepSeek API error:', err?.response?.data || err?.message || err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
} 