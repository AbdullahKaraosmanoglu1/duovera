-- Postgres ilk açılışta iki DB oluşturuyoruz
CREATE DATABASE duovera_platform;
CREATE DATABASE duovera_appdata;

-- Her iki DB’de de şema izinleri (public)
\connect duovera_platform;
GRANT ALL PRIVILEGES ON DATABASE duovera_platform TO postgres;

\connect duovera_appdata;
GRANT ALL PRIVILEGES ON DATABASE duovera_appdata TO postgres;
