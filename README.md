gs.suite
--------

gs.suite is a Monome-centric suite of Max for Live Patches comprised of the following patches:

 *  gs.Clipstep - midi clip editor
 *  gs.clipnome - clip launcher with basic mixer controls
 *  gs.chordscale - chord midi effect
 *  gs.channel - facilitates communication between tracks
 *  gs.midicontrol - send note and program change messages on a designated gs.channel
 *  gs.pchange - send program change messages on a designated gs.channel
 *  gs.tile - protocol which enables repositioning of patches on the monome

gs.suite is free software.


Downloading
-----------
gs.suite can be obtained in many different ways:

	http://github.com/tjusiyan/gs.suite
	http://post.monome.org/comments.php?DiscussionID=10717


Installation
------------
At least one instance of gs.tile.router must be running to connect to monomeserial.

	
Prefix
------
Monome 1 : gs.tile-0
Monome 2 : gs.tile-1
Monome 3 : gs.tile-2
Monome 4 : gs.tile-3


Ports
-----
IN MONOMESERIAL: host 8400, listen 8700


Documentation
-------------
Documentation for gs.suite can be found online:
	
	http://docs.monome.org/doku.php?id=app:gs.suite


Development
-----------
gs.suite development is hosted by github at:

	http://github.com/tjusiyan/gs.suite


Bug Reporting
-------------
You can send gs.suite bug reports to <griotspeak@gmail.com>.  


-------------------------------------------------------------------------------
Copyright (C) 2010, 2011 Buttons and Lights
This file is part of gs.suite

gs.suite
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.suite nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


GS.SUITE IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THOMPSON USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.