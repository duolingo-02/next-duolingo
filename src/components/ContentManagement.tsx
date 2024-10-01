'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Language } from '@prisma/client';

const ContentManagement: React.FC = () => {
const [languages, setLanguages] = useState<(Language & { lessonCount: number })[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('/api/admin/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Content Management</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.id} className="mb-2">
            {language.name} - {language.lessonCount} lessons
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentManagement;