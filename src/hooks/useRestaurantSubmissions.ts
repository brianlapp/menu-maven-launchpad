import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RestaurantSubmission {
  id: string;
  restaurant_name: string;
  address: string;
  email: string;
  phone?: string;
  website?: string;
  founded_year: string;
  story: string;
  owner_quote?: string;
  about_image_url?: string;
  menu_pdf_url?: string;
  delivery_areas: string;
  delivery_instructions?: string;
  hours: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  comments?: string;
  status: string;
  generated_site_url?: string;
  created_at: string;
  updated_at: string;
}

export const useRestaurantSubmissions = () => {
  const [submissions, setSubmissions] = useState<RestaurantSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('restaurant_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: RestaurantSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('restaurant_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setSubmissions(prev => 
        prev.map(submission => 
          submission.id === id ? { ...submission, status } : submission
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    updateSubmissionStatus
  };
};