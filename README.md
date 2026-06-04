## Requirements

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Requestly](https://requestly.com/)

## Setup

### Project setup

```
npm install
```

```
npm run dev
```

### Docker setup

```
npm docker:compose
```

### Database setup

```
npm db:generate
```

```
npm db:migrate
```

Also run these after updating schemas.

## API

To test API requests, download Requestly app and import `LibraryApi.requestly.json`

## Database

View database tables with Drizzle Studio:

```
npx drizzle-kit studio
```
