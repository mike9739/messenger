# Laravel Messenger Application

A modern real-time messaging application built with Laravel 12, Inertia.js, React, and TypeScript. This application provides a complete messaging platform with user authentication, real-time communication capabilities, and a responsive user interface.

## 🚀 Features

- **Real-time Messaging**: Built with Laravel Reverb for WebSocket communication
- **Modern Frontend**: React with TypeScript and Inertia.js for seamless SPA experience
- **Beautiful UI**: TailwindCSS with DaisyUI components for responsive design
- **User Authentication**: Complete auth system with Laravel Breeze
- **Emoji Support**: Built-in emoji picker for enhanced messaging
- **Markdown Support**: Rich text messaging with markdown rendering
- **Docker Support**: Complete containerized development environment
- **Code Quality**: ESLint, Prettier, and Laravel Pint for code formatting

## 🛠 Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 18 + TypeScript
- **Database**: PostgreSQL (primary) / MySQL (alternative)
- **Real-time**: Laravel Reverb + Pusher
- **Styling**: TailwindCSS + DaisyUI
- **Build Tool**: Vite
- **Containerization**: Docker + Laravel Sail

## 📋 Requirements

- PHP 8.2 or higher
- Node.js 18+ and npm
- PostgreSQL or MySQL
- Docker and Docker Compose (optional)

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd messenger
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   ```

3. **Start with Docker**
   ```bash
   docker-compose up -d
   ```

4. **Install dependencies**
   ```bash
   docker exec messenger-laravel.test-1 composer install
   docker exec messenger-laravel.test-1 npm install
   ```

5. **Set up the application**
   ```bash
   docker exec messenger-laravel.test-1 php artisan key:generate
   docker exec messenger-laravel.test-1 php artisan migrate
   ```

6. **Build frontend assets**
   ```bash
   docker exec messenger-laravel.test-1 npm run build
   ```

### Manual Installation

1. **Install PHP dependencies**
   ```bash
   composer install
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**
   - Update database credentials in `.env`
   - Run migrations: `php artisan migrate`

5. **Build assets and start development**
   ```bash
   npm run dev
   php artisan serve
   ```

## 🔧 Development

### Available Scripts

```bash
# Start development server with all services
composer run dev

# Frontend development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run lint         # Run ESLint

# Backend development
php artisan serve    # Start Laravel dev server
php artisan test     # Run PHPUnit tests

# Code formatting
composer run test    # Run tests
./vendor/bin/pint    # Format PHP code
```

### Docker Aliases

For easier development with Docker, you can set up these aliases:

```bash
# Add to your shell configuration (.zshrc, .bashrc, etc.)
alias sail='docker exec messenger-laravel.test-1'
alias pint='docker exec messenger-laravel.test-1 ./vendor/bin/pint'
alias artisan='docker exec messenger-laravel.test-1 php artisan'
```

## 🏗 Project Structure

```
messenger/
├── app/                 # Laravel application code
├── resources/
│   ├── js/             # React TypeScript components
│   │   ├── Components/ # Reusable UI components
│   │   ├── Layouts/    # Layout components
│   │   ├── Pages/      # Inertia.js pages
│   │   └── types/      # TypeScript definitions
│   └── views/          # Blade templates
├── routes/             # Application routes
├── database/           # Migrations and seeders
├── docker-compose.yml  # Docker configuration
└── package.json        # Node.js dependencies
```

## 🔐 Environment Configuration

Key environment variables to configure:

```env
# Application
APP_NAME="Laravel Messenger"
APP_URL=http://localhost

# Database
DB_CONNECTION=pgsql
DB_DATABASE=messenger
DB_USERNAME=root
DB_PASSWORD=

# Broadcasting (for real-time features)
BROADCAST_CONNECTION=reverb

# Queue (for background jobs)
QUEUE_CONNECTION=database
```

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run JavaScript tests (if configured)
npm run test

# Run code linting
npm run lint
./vendor/bin/pint --test
```

## 📦 Production Deployment

1. **Build assets**
   ```bash
   npm run build
   ```

2. **Optimize Laravel**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Set production environment**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **PHP**: Follow PSR-12 standards, use Laravel Pint for formatting
- **JavaScript/TypeScript**: Use ESLint and Prettier configurations
- **Commits**: Use conventional commit messages

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Laravel documentation](https://laravel.com/docs)
2. Review [Inertia.js documentation](https://inertiajs.com/)
3. Open an issue in this repository

---

**Built with ❤️ using Laravel, React, and modern web technologies.**
