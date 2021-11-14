BINDIR = prod
SERVBIN = index.js
CLIENTBIN = client.js
BIN = $(BINDIR)/$(SERVBIN) $(BINDIR)/$(CLIENTBIN)

SDIR = src
_SERVSRC = backup.js error.js help.js endsession.js launch.js
SERVSRC = $(patsubst %, $(SDIR)/intents/%, $(_SERVSRC))

_CLIENTSRC = 
CLIENTSRC = $(patsubst %, client/%, $(_CLIENTSRC))

all: $(BIN)

$(BINDIR)/$(SERVBIN): $(SERVSRC)
	echo $(SERVSRC)
	awk '{print}' $(SDIR)/header.js >> $@
	awk '{print}' $^ >> $@
	awk '{print}' $(SDIR)/footer.js >> $@

$(BINDIR)/$(CLIENTBIN):
	awk '{print}' client.js >> $@
	#awk '{print}' $^ >> $@

clean:
	rm -f $(BIN)
