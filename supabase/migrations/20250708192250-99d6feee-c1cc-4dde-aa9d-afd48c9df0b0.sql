-- Create restaurant submissions table
CREATE TABLE public.restaurant_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  founded_year TEXT,
  story TEXT NOT NULL,
  owner_quote TEXT,
  about_image_url TEXT,
  menu_pdf_url TEXT,
  delivery_areas TEXT NOT NULL,
  delivery_instructions TEXT,
  hours TEXT NOT NULL,
  instagram TEXT,
  facebook TEXT,
  twitter TEXT,
  comments TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in-review', 'generated', 'live')),
  generated_site_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create restaurant dishes table
CREATE TABLE public.restaurant_dishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_submission_id UUID NOT NULL REFERENCES public.restaurant_submissions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create restaurant photos table
CREATE TABLE public.restaurant_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_submission_id UUID NOT NULL REFERENCES public.restaurant_submissions(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage buckets for restaurant files
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('restaurant-images', 'restaurant-images', true),
  ('restaurant-pdfs', 'restaurant-pdfs', true);

-- Create storage policies for restaurant images
CREATE POLICY "Anyone can view restaurant images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'restaurant-images');

CREATE POLICY "Anyone can upload restaurant images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'restaurant-images');

CREATE POLICY "Anyone can update restaurant images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'restaurant-images');

CREATE POLICY "Anyone can delete restaurant images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'restaurant-images');

-- Create storage policies for restaurant PDFs
CREATE POLICY "Anyone can view restaurant PDFs" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'restaurant-pdfs');

CREATE POLICY "Anyone can upload restaurant PDFs" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'restaurant-pdfs');

CREATE POLICY "Anyone can update restaurant PDFs" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'restaurant-pdfs');

CREATE POLICY "Anyone can delete restaurant PDFs" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'restaurant-pdfs');

-- Create indexes for performance
CREATE INDEX idx_restaurant_submissions_status ON public.restaurant_submissions(status);
CREATE INDEX idx_restaurant_submissions_created_at ON public.restaurant_submissions(created_at);
CREATE INDEX idx_restaurant_dishes_submission_id ON public.restaurant_dishes(restaurant_submission_id);
CREATE INDEX idx_restaurant_photos_submission_id ON public.restaurant_photos(restaurant_submission_id);

-- Create trigger function for updating timestamps
CREATE TRIGGER update_restaurant_submissions_updated_at
  BEFORE UPDATE ON public.restaurant_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on tables (but allow all operations since it's internal)
ALTER TABLE public.restaurant_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_photos ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for internal tool
CREATE POLICY "Allow all operations on restaurant submissions" 
ON public.restaurant_submissions FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on restaurant dishes" 
ON public.restaurant_dishes FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on restaurant photos" 
ON public.restaurant_photos FOR ALL 
USING (true) 
WITH CHECK (true);