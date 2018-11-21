#!/bin/bash

###########################################################
#	Vars
###########################################################

# Output colors
COLOR='\033[1;36m'
NC='\033[0m' # No Color

# Prints a pretty colored message
function info { echo -e "${COLOR}(*)	$1		($(date)) ${NC}"; }

###########################################################
#	Commands
###########################################################

# 	Build
info "Building project"
npm run build

# echo -e "${COLOR}(*)	Compressing images${NC}"
# echo "		Before compression:"
# echo "		$(du -h ${LOCAL_DIR}/images)"
# npm run compress
# echo "		After compression:"
# echo "		$(du -h ${LOCAL_DIR}/images)"

# Let a user know
info "Done!		"