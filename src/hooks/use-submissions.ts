
import { useState, useEffect } from 'react';
import { Submission } from '@/components/admin/SubmissionReview';

// This hook handles both song and playlist submissions
export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSubmissions = () => {
      setLoading(true);
      
      // Get submissions from localStorage if exists
      const storedSubmissions = localStorage.getItem('adminSubmissions');
      
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }
      
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  // Add a new submission (from submission forms)
  const addSubmission = (newSubmission: Omit<Submission, 'id' | 'status' | 'date'>) => {
    const submissionWithMeta: Submission = {
      ...newSubmission,
      id: crypto.randomUUID(),
      status: 'pending',
      date: new Date().toISOString()
    };
    
    const updatedSubmissions = [...submissions, submissionWithMeta];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('adminSubmissions', JSON.stringify(updatedSubmissions));
    
    return submissionWithMeta.id; // Return ID for reference
  };

  // Update submission status
  const updateSubmissionStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? { ...submission, status } : submission
    );
    
    setSubmissions(updatedSubmissions);
    localStorage.setItem('adminSubmissions', JSON.stringify(updatedSubmissions));
  };

  return { 
    submissions, 
    loading, 
    addSubmission,
    updateSubmissionStatus
  };
};
