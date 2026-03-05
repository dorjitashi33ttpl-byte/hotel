-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create GIST spatial indices for performance
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels USING GIST (location);

-- Enable uuid-ossp for secure random IDs if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sample query to verify PostGIS
-- SELECT ST_Distance(ST_GeomFromText('POINT(0 0)', 4326), ST_GeomFromText('POINT(1 1)', 4326));
