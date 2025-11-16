-- Demo sweets data with Indian prices (in Rupees)
INSERT INTO sweets (name, category, price, quantity) VALUES
('Chocolate Bar', 'Chocolate', 25.00, 100),
('Gummy Bears', 'Candy', 18.00, 150),
('Lollipop', 'Candy', 8.00, 200),
('Caramel Toffee', 'Toffee', 22.00, 80),
('Mint Chocolate', 'Chocolate', 28.00, 120),
('Jelly Beans', 'Candy', 18.00, 180),
('Dark Chocolate', 'Chocolate', 45.00, 90),
('Cotton Candy', 'Candy', 25.00, 60),
('Fudge Brownie', 'Bakery', 55.00, 50),
('Sour Patch Kids', 'Candy', 28.00, 130),
('White Chocolate', 'Chocolate', 32.00, 110),
('Rock Candy', 'Candy', 12.00, 140),
('Truffles', 'Chocolate', 90.00, 40),
('Licorice', 'Candy', 18.00, 100),
('Peppermint Candy', 'Candy', 8.00, 250),
('Chocolate Chip Cookie', 'Bakery', 35.00, 70),
('Marshmallows', 'Candy', 22.00, 160),
('Fruit Gummies', 'Candy', 22.00, 120),
('Honeycomb', 'Toffee', 35.00, 55),
('Chocolate Covered Nuts', 'Chocolate', 70.00, 65)
ON CONFLICT DO NOTHING;

