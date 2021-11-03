BINDIR = prod
SERVBIN = index.js
CLIENTBIN = client.js
BIN = $(BINDIR)/$(SERVBIN) $(BINDIR)/$(CLIENTBIN)

_SERVSRC = backup.js
SERVSRC = $(patsubst %, intents/%, $(_SERVSRC))

_CLIENTSRC = 
CLIENTSRC = $(patsubst %, client/%, $(_CLIENTSRC))

all: $(BIN)

$(BINDIR)/$(SERVBIN): $(SERVSRC)
	awk '{print}' index.js >> $@
	awk '{print}' $^ >> $@

$(BINDIR)/$(CLIENTBIN): $(CLIENTSRC)
	awk '{print}' client.js >> $@
	awk '{print}' $^ >> $@

clean:
	rm -f $(BIN)
