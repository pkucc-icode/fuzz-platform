#!/bin/bash
cd /home/win10/xkt
rm -rf xpdf-4.05
python3 agent.py fuzz.json
