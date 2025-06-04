CREATE DATABASE graphic_violence;
USE graphic_violence;

CREATE TABLE comments (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contents VARCHAR(1000) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE inventory (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price FLOAT NOT NULL,
    image_url VARCHAR(255),
    count integer NOT NULL
);

INSERT INTO comments (name, contents, email)
VALUES
('John Doe', 'Hello, what a cool website', 'johndoe@gmail.com'),
('Jane Doe', 'Wowza, what a cool website', 'janedoe@gmail.com');

INSERT INTO inventory(name, description, price, image_url, count)
VALUES
('Juniper Shirt', 'Awesome shirt with cool design!', 24.99, 'https://i.imgur.com/02uob4M.png', 6),
('Camo Shirt', 'Cool camo shirt!', 19.99, '../../public/camo_placeholder.jpeg', 3);

-- Update query
UPDATE inventory
SET image_url = 'https://i.imgur.com/cfxKnIr.jpeg'
WHERE id = 2;