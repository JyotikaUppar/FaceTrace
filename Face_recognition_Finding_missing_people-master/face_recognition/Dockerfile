# Multi-stage Python AI Recognition Container
# Bookworm provides a maintained package repository and a stable toolchain.
FROM python:3.9-slim-bookworm AS builder

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
# The source dependency list is UTF-16 and also used on Windows. Convert it
# inside the image, remove Windows-only packages, and update dlib's older
# bundled pybind11 implementation before installing it.
RUN python -c "from pathlib import Path; p = Path('requirements.txt'); p.write_text(p.read_text(encoding='utf-16'), encoding='utf-8')" \
    && sed -i -e '/^pywin32==/d' -e '/^pywinpty==/d' -e 's/^dlib==19\.24\.0$/dlib==19.24.6/' requirements.txt \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.9-slim-bookworm AS runner
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1001 appuser

COPY --from=builder /install /usr/local
COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8501

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:8501/_stcore/health || exit 1

CMD ["streamlit", "run", "main.py", "--server.port=8501", "--server.address=0.0.0.0"]
