# **LifeSwap**

> Intercambia rutinas con extraños y experimenta nuevas formas de vivir.

LifeSwap es una web app que permite a los usuarios subir su rutina diaria y recibir aleatoriamente la rutina de otra persona para intentar seguirla por un día. El objetivo es fomentar la empatía, la exploración de hábitos y salir de la zona de confort a través de experiencias inesperadas.

## 💻 Tecnologías Usadas
### FrontEnd

* [![Angular][Angular.io]][Angular-url]

### BackEnd

* [![NestJS][nestjs.com]][NestJS-url]
* [![Prisma][prisma.io]][Prisma-url]
* [![PostgreSQL][postgresql.org]][PostgreSQL-url]

### Diagrama relacional de la Base de Datos
```mermaid
erDiagram
    CATEGORY {
        string id PK
        string name
    }

    SUBCATEGORY {
        string id PK
        string name
        string category_id FK
    }

    ACTIVITY {
        string id PK
        string title
        string description
        string time_range "Enum: mañana, tarde, noche"
        string time
        string subcategory_id FK
    }

    GOAL {
        string id PK
        string period "Enum: diario, semanal, mensual"
        int value
        string unit_id FK
        string activity_id FK
    }

    UNIT {
        string id PK
        string name
    }

    CATEGORY ||--o{ SUBCATEGORY : "contiene"
    SUBCATEGORY ||--o{ ACTIVITY : "clasifica"
    ACTIVITY ||--|| GOAL : "posee"
    UNIT ||--o{ GOAL : "define"
```

## 🚀 Primeros pasos
### BackEnd
> Node version: ```>=22.x```

Crear el archivo ```.env``` usando como ejemplo el archivo ```.env.example```

instalar pnpm globalmente usando el siguiente comando
```bash
npm install -g pnpm@9.14.2
```

Dentro del directorio ```backend``` ejecutar el siguiente comando
```bash
pnpm install
```

<!-- MARKDOWN LINKS & IMAGES -->
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[nestjs.com]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[NestJS-url]: https://nestjs.com/
[postgresql.org]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/