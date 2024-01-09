CREATE TABLE Shortlinks.urlinfo (
    id INT auto_increment NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    redirect_url TEXT NOT NULL,
    short_url BIGINT NOT NULL,
    created_by VARCHAR(100) DEFAULT `guest` NULL,
    CONSTRAINT urlinfo_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;