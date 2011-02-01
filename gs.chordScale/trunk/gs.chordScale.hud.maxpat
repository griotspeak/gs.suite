{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 338.0, 234.0, 1297.0, 647.0 ],
		"bglocked" : 0,
		"defrect" : [ 338.0, 234.0, 1297.0, 647.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "live.text",
					"numinlets" : 1,
					"mode" : 0,
					"patching_rect" : [ 424.0, 514.0, 110.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"text" : "ChordScale",
					"id" : "obj-19",
					"parameter_enable" : 1,
					"outlettype" : [ "", "" ],
					"presentation_rect" : [ 9.0, 9.0, 129.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.text",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.text"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend bgcolor",
					"numinlets" : 1,
					"patching_rect" : [ 249.0, 486.0, 89.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-25",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.colors",
					"numinlets" : 0,
					"patching_rect" : [ 207.0, 455.0, 61.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 3,
					"id" : "obj-38",
					"outlettype" : [ "", "", "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setOnChange",
					"numinlets" : 1,
					"patching_rect" : [ 867.0, 225.0, 132.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 1,
					"id" : "obj-4",
					"outlettype" : [ "" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "on change",
					"linecount" : 2,
					"numinlets" : 1,
					"patching_rect" : [ 900.0, 131.0, 51.0, 29.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-5",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 13.0, 76.0, 66.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.menu",
					"varname" : "live.menu",
					"numinlets" : 1,
					"patching_rect" : [ 867.0, 171.0, 100.0, 15.0 ],
					"numoutlets" : 3,
					"presentation" : 1,
					"id" : "obj-3",
					"parameter_enable" : 1,
					"outlettype" : [ "", "", "float" ],
					"pictures" : [  ],
					"presentation_rect" : [ 15.0, 94.0, 52.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.menu",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "hold", "clip", "retrig" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.menu"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setChannel",
					"numinlets" : 1,
					"patching_rect" : [ 748.0, 349.0, 119.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 1,
					"id" : "obj-8",
					"outlettype" : [ "" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "channel\n",
					"numinlets" : 1,
					"patching_rect" : [ 748.0, 111.0, 51.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-11",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 17.0, 40.0, 49.0, 18.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "live.numbox",
					"numinlets" : 1,
					"patching_rect" : [ 747.0, 143.0, 45.0, 15.0 ],
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-6",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 21.0, 57.0, 36.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.numbox[16]",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.numbox[1]"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "r ---toHud",
					"numinlets" : 0,
					"patching_rect" : [ 58.0, 22.0, 62.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 1,
					"id" : "obj-2",
					"outlettype" : [ "" ],
					"color" : [ 0.278431, 0.921569, 0.639216, 1.0 ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route 0 1 2 3 4 5 6 7 channel onChange",
					"numinlets" : 1,
					"patching_rect" : [ 58.0, 56.0, 774.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 11,
					"id" : "obj-23",
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "s ---toChordJs",
					"numinlets" : 1,
					"patching_rect" : [ 58.0, 437.0, 79.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"id" : "obj-22",
					"color" : [ 0.756863, 0.329412, 0.843137, 1.0 ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "$2 $1 $3",
					"numinlets" : 2,
					"patching_rect" : [ 58.0, 381.0, 49.0, 16.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-35",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "funnel 8 0",
					"numinlets" : 8,
					"patching_rect" : [ 58.0, 349.0, 611.5, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 1,
					"id" : "obj-21",
					"outlettype" : [ "list" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 650.685974, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-18",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 415.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 566.016541, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-17",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 377.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 481.347107, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-16",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 339.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 396.677673, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-15",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 301.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 312.00827, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-14",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 263.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 227.338837, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-13",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 225.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 142.669418, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-12",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"offset" : [ -66.0, 0.0 ],
					"presentation_rect" : [ 187.0, 2.0, 39.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "bpatcher",
					"numinlets" : 1,
					"patching_rect" : [ 58.0, 120.0, 64.0, 171.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-1",
					"args" : [  ],
					"name" : "gs.chordScale.singleDisplaySlot.maxpat",
					"outlettype" : [ "" ],
					"presentation_rect" : [ 80.0, 2.0, 108.0, 171.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 209.0, 517.0, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-71",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 9.0, 35.0, 65.0, 87.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 245.0, 517.0, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-10",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 80.0, 35.0, 376.0, 126.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"patching_rect" : [ 282.0, 517.0, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-7",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 144.0, 8.0, 309.0, 43.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-25", 0 ],
					"destination" : [ "obj-7", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-25", 0 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-25", 0 ],
					"destination" : [ "obj-71", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-38", 2 ],
					"destination" : [ "obj-25", 0 ],
					"hidden" : 0,
					"midpoints" : [ 258.5, 479.0, 258.5, 479.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 0 ],
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-21", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 1 ],
					"destination" : [ "obj-12", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 0 ],
					"destination" : [ "obj-21", 1 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 2 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-13", 0 ],
					"destination" : [ "obj-21", 2 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 3 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-14", 0 ],
					"destination" : [ "obj-21", 3 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 4 ],
					"destination" : [ "obj-15", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-15", 0 ],
					"destination" : [ "obj-21", 4 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 5 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-21", 5 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 6 ],
					"destination" : [ "obj-17", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-17", 0 ],
					"destination" : [ "obj-21", 6 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 7 ],
					"destination" : [ "obj-18", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-18", 0 ],
					"destination" : [ "obj-21", 7 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-22", 0 ],
					"hidden" : 0,
					"midpoints" : [ 876.5, 420.5, 67.5, 420.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [ 876.5, 205.0, 876.5, 205.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-8", 0 ],
					"destination" : [ "obj-22", 0 ],
					"hidden" : 0,
					"midpoints" : [ 757.5, 401.5, 67.5, 401.5 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-6", 0 ],
					"destination" : [ "obj-8", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-35", 0 ],
					"destination" : [ "obj-22", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-21", 0 ],
					"destination" : [ "obj-35", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 8 ],
					"destination" : [ "obj-6", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-23", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 9 ],
					"destination" : [ "obj-3", 0 ],
					"hidden" : 0,
					"midpoints" : [ 747.0, 99.0, 876.5, 99.0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-16::obj-6" : [ "live.numbox[8]", "live.numbox[1]", 0 ],
			"obj-14::obj-8" : [ "live.numbox[3]", "live.numbox", 0 ],
			"obj-12::obj-9" : [ "live.toggle[3]", "live.toggle", 0 ],
			"obj-6" : [ "live.numbox[16]", "live.numbox[1]", 0 ],
			"obj-17::obj-10" : [ "live.toggle[19]", "live.toggle", 0 ],
			"obj-15::obj-8" : [ "live.numbox[4]", "live.numbox", 0 ],
			"obj-13::obj-6" : [ "live.numbox[11]", "live.numbox[1]", 0 ],
			"obj-18::obj-12" : [ "live.toggle[21]", "live.toggle", 0 ],
			"obj-16::obj-13" : [ "gsChord-accidental-0[5]", "accidental-0", 0 ],
			"obj-16::obj-8" : [ "live.numbox[5]", "live.numbox", 0 ],
			"obj-14::obj-12" : [ "live.toggle[9]", "live.toggle", 0 ],
			"obj-12::obj-12" : [ "live.toggle[4]", "live.toggle", 0 ],
			"obj-18::obj-6" : [ "live.numbox[1]", "live.numbox[1]", 0 ],
			"obj-12::obj-6" : [ "live.numbox[13]", "live.numbox[1]", 0 ],
			"obj-1::obj-8" : [ "live.numbox", "live.numbox", 0 ],
			"obj-17::obj-12" : [ "live.toggle[18]", "live.toggle", 0 ],
			"obj-15::obj-9" : [ "live.toggle[14]", "live.toggle", 0 ],
			"obj-13::obj-8" : [ "live.numbox[12]", "live.numbox", 0 ],
			"obj-1::obj-12" : [ "live.toggle[1]", "live.toggle", 0 ],
			"obj-1::obj-13" : [ "gsChord-accidental-0", "accidental-0", 0 ],
			"obj-18::obj-9" : [ "live.toggle[23]", "live.toggle", 0 ],
			"obj-16::obj-12" : [ "live.toggle[15]", "live.toggle", 0 ],
			"obj-14::obj-6" : [ "live.numbox[10]", "live.numbox[1]", 0 ],
			"obj-12::obj-10" : [ "live.toggle[5]", "live.toggle", 0 ],
			"obj-17::obj-8" : [ "live.numbox[6]", "live.numbox", 0 ],
			"obj-15::obj-10" : [ "live.toggle[13]", "live.toggle", 0 ],
			"obj-15::obj-12" : [ "live.toggle[12]", "live.toggle", 0 ],
			"obj-13::obj-10" : [ "live.toggle[7]", "live.toggle", 0 ],
			"obj-1::obj-6" : [ "live.numbox[15]", "live.numbox[1]", 0 ],
			"obj-1::obj-9" : [ "live.toggle[2]", "live.toggle", 0 ],
			"obj-18::obj-10" : [ "live.toggle[22]", "live.toggle", 0 ],
			"obj-16::obj-10" : [ "live.toggle[16]", "live.toggle", 0 ],
			"obj-1::obj-10" : [ "live.toggle", "live.toggle", 0 ],
			"obj-14::obj-9" : [ "live.toggle[10]", "live.toggle", 0 ],
			"obj-12::obj-13" : [ "gsChord-accidental-0[1]", "accidental-0", 0 ],
			"obj-17::obj-9" : [ "live.toggle[20]", "live.toggle", 0 ],
			"obj-15::obj-6" : [ "live.numbox[9]", "live.numbox[1]", 0 ],
			"obj-13::obj-13" : [ "gsChord-accidental-0[2]", "accidental-0", 0 ],
			"obj-18::obj-8" : [ "live.numbox[7]", "live.numbox", 0 ],
			"obj-16::obj-9" : [ "live.toggle[17]", "live.toggle", 0 ],
			"obj-14::obj-13" : [ "gsChord-accidental-0[3]", "accidental-0", 0 ],
			"obj-14::obj-10" : [ "live.toggle[11]", "live.toggle", 0 ],
			"obj-12::obj-8" : [ "live.numbox[14]", "live.numbox", 0 ],
			"obj-3" : [ "live.menu", "live.menu", 0 ],
			"obj-17::obj-6" : [ "live.numbox[2]", "live.numbox[1]", 0 ],
			"obj-17::obj-13" : [ "gsChord-accidental-0[6]", "accidental-0", 0 ],
			"obj-15::obj-13" : [ "gsChord-accidental-0[4]", "accidental-0", 0 ],
			"obj-13::obj-9" : [ "live.toggle[8]", "live.toggle", 0 ],
			"obj-13::obj-12" : [ "live.toggle[6]", "live.toggle", 0 ],
			"obj-19" : [ "live.text", "live.text", 0 ],
			"obj-18::obj-13" : [ "gsChord-accidental-0[7]", "accidental-0", 0 ]
		}

	}

}
