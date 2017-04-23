FROM tianon/true

LABEL maintainer "thom.nocon@gmail.com"

COPY dist/prod dist/dm-frontend

VOLUME dist/dm-frontend