#!/usr/bin/env bash

pandoc -s --toc overview.md --mathjax --pdf-engine=xelatex --metadata-file=metadata.yaml -o whitepaper.pdf
