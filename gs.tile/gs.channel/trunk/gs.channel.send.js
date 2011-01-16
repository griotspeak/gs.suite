/*
-*- coding: utf-8 -*-
gs.channel v00.000
Copyright (c) 2010, TJ Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <AppName> nor the
      names of its contributors may be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY TJ USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL TJ USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

var autowatch = 1;

var inlets = 1;
var outlets = 2;

var parameter = {
    channel : {
        name : "channel",
        value : 0
    },
    noteThru : {
        name : "noteThru",
        value : 1
    },
    programChangeThru : {
        name : "programChangeThru",
        value : 1
    },
    pitch : []
};

function setChannel(aValue) {
    parameter.channel.value = aValue;
}

function setNoteThru(aValue) {
    parameter.noteThru.value = aValue;
    //if (!aValue) { panic(); }
}

function setProgramChangeThru(aValue) {
    parameter.programChangeThru.value = aValue;
    //if (!aValue) { panic(); }
}

function thruNote(aPitch, aVelocity) {
    if (parameter.noteThru.value) {
        sendNoteMessage(aPitch, aVelocity);
    }
}

function thruProgramChange(aProgramChange) {
    if (parameter.programChangeThru.value) {
        sendProgramChangeMessage(aProgramChange);
    }
}

function sendNoteMessage(aPitch, aVelocity) {
    
    if (parameter.noteThru.value) {
        outlet(0, aPitch, aVelocity);
    }
    
    messnamed("gs.channel", "channelNote",parameter.channel.value, aPitch, aVelocity);

    parameter.pitch[aPitch] = Boolean(aVelocity);
    
}

function sendProgramChangeMessage(aProgramChange) {
    if (parameter.programChangeThru.value) {
        outlet(1, aProgramChange);
    }
    
    messnamed("channelProgramChange", parameter.channel.value, aNumber); 
    
}

function panic() {
    for (var iPitch = 0; iPitch < 128; iPitch++) {
        if (parameter.pitch[iPitch]) {
            sendNoteMessage(iPitch, 0);
        }
    }
}

