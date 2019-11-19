#!/usr/bin/env bash

# Build Echo PoWR Whitepaper
cd ./technologies/echo-powr/whitepaper/ && pandoc -s --toc powr-whitepaper.md --mathjax --pdf-engine=xelatex --metadata-file=./metadata.yaml -o ../../../.gitbook/assets/powr-whitepaper.pdf && cd ../../../
# Build Echo Sidechains Whitepaper
cd ./technologies/sidechains/whitepaper/ && pandoc -s --toc sidechains-whitepaper.md --mathjax --pdf-engine=xelatex --metadata-file=./metadata.yaml -o ../../../.gitbook/assets/echo-sidechains-whitepaper.pdf && cd ../../../
# Build Echo Sidechains Whitepaper
cd ./technologies/x86-64-virtual-machine/whitepaper/ && pandoc -s --toc x86-64-vm-whitepaper.md --mathjax --pdf-engine=xelatex --metadata-file=./metadata.yaml -o ../../../.gitbook/assets/x86-64-vm-whitepaper.pdf && cd ../../../
