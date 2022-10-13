#!/bin/bash
trap "kill 0" EXIT
trap "exit" INT TERM ERR

yarn dev &
npx vitest run
