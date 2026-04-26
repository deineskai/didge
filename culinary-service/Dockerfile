# Stage 1: Build stage
FROM python:3.14-slim AS builder

# Install system dependencies needed for building some Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install poetry
RUN pip install poetry

# Disable virtualenv creation by poetry (not needed inside a container)
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR app

# Copy dependency files first (for better caching)
COPY pyproject.toml poetry.lock* /app/

# Install dependencies only
RUN poetry install --no-interaction --no-ansi --no-root -vvv

# Stage 2: Runtime stage
FROM python:3.14-slim

WORKDIR /app

# Copy only the installed packages from the builder stage
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the application code
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Start the application
WORKDIR /app
ENV PYTHONPATH=/app/src
CMD ["uvicorn", "culinary_service.main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "src"]