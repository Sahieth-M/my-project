/*
  # Voice Deepfake Predictions Schema

  1. New Tables
    - `predictions`
      - `id` (uuid, primary key) - Unique identifier for each prediction
      - `audio_filename` (text) - Original filename of the uploaded audio
      - `prediction` (text) - Result: "Genuine Voice" or "Fake Voice"
      - `confidence` (numeric) - Confidence score (0-1)
      - `audio_duration` (numeric) - Duration of audio in seconds
      - `file_size` (integer) - Size of audio file in bytes
      - `created_at` (timestamptz) - Timestamp of prediction
      - `user_id` (text, nullable) - Optional user identifier for future auth
      - `metadata` (jsonb, nullable) - Additional analysis metadata
  
  2. Security
    - Enable RLS on `predictions` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
    
  3. Indexes
    - Index on created_at for efficient time-based queries
    - Index on prediction for filtering by result type

  4. Notes
    - This schema supports the voice deepfake detection system
    - RLS policies allow public access for demo, but can be restricted later with auth
*/

CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audio_filename text NOT NULL,
  prediction text NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  audio_duration numeric DEFAULT 0,
  file_size integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id text,
  metadata jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to predictions"
  ON predictions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert of predictions"
  ON predictions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_prediction ON predictions(prediction);