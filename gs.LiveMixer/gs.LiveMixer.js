

//<License

/*
-*- coding: utf-8 -*-

gs.LiveMixer
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.LiveMixer nor the
        names of its contributors may be used to endorse or promote products
        derived from gs.LiveMixer without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


GS.LIVEMIXER IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THOMPSON USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */
//License>

autowatch = 1;

inlets = 1;
outlets = 2;

var debugLevel;
//declareattribute("debugLevel",	null,			"setDebugLevel",			1);
setDebugLevel(0);

//debugLevel[1] = true;
//debugLevel[2] = true;
//debugLevel[3] = true;
//debugLevel[4] = true;
//debugLevel[5] = true;
//debugLevel[6] = true;

// 0 - silence
// 1 - function name at start
// 2 - function end
// 3 - variables at end of function
// 4 - variables at start of function
// 5 - lists. so many lists.
// 6 - setters and getters

function setDebugLevel(level) {
	if (level > 0) { post("    --setDebugLevel--\n"); }
	debugLevel = new Array();
	 for (var c = 0; c < 6; c++) {
		if (c <= level) {
			debugLevel[c] = true;
		}
		else {
			debugLevel[c] = false;
		}
	}
}

function fader(whichFader, newValue) {
	trackVolume = new LiveAPI(this.patcher, null, "live_set tracks " + whichFader + " mixer_device volume");
	trackVolume.set("value", newValue);
}