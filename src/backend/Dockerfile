FROM postgres:latest

# Установка pgvector
RUN apt-get update \
    && apt-get install -y wget gcc make postgresql-server-dev-all \
    && wget https://github.com/ankane/pgvector/archive/refs/tags/v0.2.5.tar.gz \
    && tar -xvzf v0.2.5.tar.gz \
    && cd pgvector-0.2.5 \
    && make \
    && make install \
    && echo "shared_preload_libraries = 'pgvector'" >> /var/lib/postgresql/data/postgresql.conf
