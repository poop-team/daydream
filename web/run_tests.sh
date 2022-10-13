#!/bin/bash

yarn dev &
npx vitest run
kill $!
