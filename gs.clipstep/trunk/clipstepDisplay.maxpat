{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 411.0, 44.0, 1252.0, 721.0 ],
		"bglocked" : 0,
		"defrect" : [ 411.0, 44.0, 1252.0, 721.0 ],
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
					"maxclass" : "newobj",
					"text" : "s ---toInitialize",
					"numinlets" : 1,
					"patching_rect" : [ 129.0, 95.0, 78.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"id" : "obj-17",
					"color" : [ 0.12549, 0.658824, 0.180392, 1.0 ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.text",
					"varname" : "clipstepCompile",
					"numinlets" : 1,
					"mode" : 0,
					"patching_rect" : [ 129.0, 24.0, 137.0, 33.0 ],
					"fontsize" : 18.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"text" : "ClipStep",
					"id" : "obj-25",
					"parameter_enable" : 1,
					"outlettype" : [ "", "" ],
					"presentation_rect" : [ 9.0, 9.0, 144.0, 26.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "clipstepCompile",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
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
							"parameter_shortname" : "compile"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend bgcolor",
					"numinlets" : 1,
					"patching_rect" : [ 384.0, 53.0, 97.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 1,
					"id" : "obj-16",
					"outlettype" : [ "" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "m4l.colors",
					"numinlets" : 0,
					"patching_rect" : [ 338.0, 11.0, 65.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 3,
					"id" : "obj-15",
					"outlettype" : [ "", "", "" ],
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "follow",
					"numinlets" : 1,
					"patching_rect" : [ 1694.0, 187.0, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-9",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 1694.0, 187.0, 57.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "fold",
					"numinlets" : 1,
					"patching_rect" : [ 920.0, 249.0, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-1",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 162.0, 80.0, 38.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setFollowPlayingClip",
					"numinlets" : 1,
					"patching_rect" : [ 1661.875, 223.847107, 153.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-7",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "live.toggle",
					"numinlets" : 1,
					"patching_rect" : [ 1661.875, 187.0, 15.0, 15.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-6",
					"parameter_enable" : 1,
					"outlettype" : [ "" ],
					"presentation_rect" : [ 1661.875, 187.0, 15.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "live.toggle",
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
							"parameter_enum" : [ "off", "on" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.toggle"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTime",
					"numinlets" : 1,
					"patching_rect" : [ 300.461548, 348.847107, 90.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-5",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTopNote",
					"numinlets" : 1,
					"patching_rect" : [ 653.15387, 348.847107, 107.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-4",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setClipSceneFromPatcher",
					"numinlets" : 1,
					"patching_rect" : [ 121.666664, 348.847107, 177.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-3",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTrack",
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 348.847107, 93.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-2",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWidth",
					"numinlets" : 1,
					"patching_rect" : [ 398.692322, 348.847107, 95.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-83",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "r ---toHUD",
					"numinlets" : 0,
					"patching_rect" : [ 17.0, 35.847107, 58.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-55",
					"outlettype" : [ "" ],
					"color" : [ 0.960784, 0.439216, 0.478431, 1.0 ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setFolding",
					"numinlets" : 1,
					"patching_rect" : [ 907.615356, 348.847107, 103.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-60",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "velocity",
					"numinlets" : 1,
					"patching_rect" : [ 1564.78894, 244.847107, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-74",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 162.0, 140.0, 56.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "length",
					"numinlets" : 1,
					"patching_rect" : [ 1057.708496, 244.847107, 55.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-75",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 162.0, 119.0, 49.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepVelocity",
					"numinlets" : 1,
					"patching_rect" : [ 1543.769287, 284.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-67",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 217.0, 140.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepVelocity",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 96 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "velocity"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepNoteLength",
					"prototypename" : "clipstep.noteLength",
					"numinlets" : 1,
					"patching_rect" : [ 1034.846191, 284.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-59",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 217.0, 119.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepNoteLength",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.03125 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "length"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "s ---toJS",
					"numinlets" : 1,
					"patching_rect" : [ 675.337158, 547.847107, 50.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"id" : "obj-51",
					"color" : [ 0.756863, 0.329412, 0.843137, 1.0 ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setCycles",
					"numinlets" : 1,
					"patching_rect" : [ 1416.538452, 348.847107, 99.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-43",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setRootNote",
					"numinlets" : 1,
					"patching_rect" : [ 1289.307739, 244.847107, 112.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-24",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setNewNoteLength",
					"numinlets" : 1,
					"patching_rect" : [ 1034.846191, 348.847107, 143.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-69",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "cycles",
					"numinlets" : 1,
					"patching_rect" : [ 1437.0, 244.847107, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-64",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 162.0, 60.0, 47.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "root",
					"numinlets" : 1,
					"patching_rect" : [ 1314.0, 179.847107, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-63",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 162.0, 39.0, 47.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepCycles",
					"numinlets" : 1,
					"patching_rect" : [ 1416.538452, 284.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-57",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 217.0, 60.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepCycles",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 64.0,
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 4 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "cycles"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepRoot",
					"numinlets" : 1,
					"patching_rect" : [ 1289.307739, 212.847107, 44.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-54",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 217.0, 39.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepRoot",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 60 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "root"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "#1ClipstepFolding",
					"numinlets" : 1,
					"patching_rect" : [ 908.115356, 284.847107, 15.0, 15.0 ],
					"numoutlets" : 1,
					"presentation" : 1,
					"id" : "obj-53",
					"parameter_enable" : 1,
					"outlettype" : [ "" ],
					"presentation_rect" : [ 218.0, 81.0, 15.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepFolding",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "off", "on" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "folding"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setCurrentScaleWithSymbol",
					"numinlets" : 1,
					"patching_rect" : [ 1202.576904, 348.847107, 187.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-49",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.menu",
					"varname" : "#1ClipstepScale",
					"numinlets" : 1,
					"patching_rect" : [ 1162.076904, 284.847107, 100.0, 15.0 ],
					"numoutlets" : 3,
					"presentation" : 1,
					"id" : "obj-36",
					"parameter_enable" : 1,
					"outlettype" : [ "", "", "float" ],
					"pictures" : [  ],
					"presentation_rect" : [ 168.0, 17.0, 100.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepScale",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 0,
							"parameter_annotation_name" : "",
							"parameter_enum" : [ "Drums", "_", "Major", "NaturalMinor", "HarmonicMinor", "Chromatic", "___", "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian", "___", "MinorPentatonic", "MajorPentatonic", "BluePentatonic", "____", "WholeTone", "WholeHalfDiminished", "HalfWholeDiminished", "SymmetricalAugmented", "Tritone", "_____", "MajorQuartal", "MinorQuartal" ],
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "scale"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setNewNoteVelocity",
					"numinlets" : 1,
					"patching_rect" : [ 1543.769287, 348.847107, 148.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-44",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "latest",
					"numinlets" : 1,
					"patching_rect" : [ 799.0, 244.847107, 62.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-31",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 80.0, 64.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepLatest",
					"numinlets" : 1,
					"patching_rect" : [ 780.384644, 284.847107, 44.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-39",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"ignoreclick" : 1,
					"presentation_rect" : [ 339.0, 80.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepLatest",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
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
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "latest"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "0 measures",
					"linecount" : 3,
					"numinlets" : 1,
					"patching_rect" : [ 525.923096, 244.847107, 78.0, 58.0 ],
					"fontsize" : 15.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-58",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 15.0, 105.0, 131.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "top note ",
					"numinlets" : 1,
					"patching_rect" : [ 670.0, 244.847107, 61.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-46",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 59.0, 59.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTopNote",
					"numinlets" : 1,
					"patching_rect" : [ 653.15387, 284.847107, 43.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-45",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"ignoreclick" : 1,
					"presentation_rect" : [ 339.0, 59.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepTopNote",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
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
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "topNote"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"numinlets" : 1,
					"patching_rect" : [ 417.0, 244.847107, 40.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-28",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 38.0, 46.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "begin",
					"numinlets" : 1,
					"patching_rect" : [ 286.0, 244.847107, 46.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-29",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 17.0, 43.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepWidth",
					"numinlets" : 1,
					"patching_rect" : [ 398.692322, 284.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-20",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"ignoreclick" : 1,
					"presentation_rect" : [ 339.0, 38.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepWidth",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
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
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "width"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTime",
					"numinlets" : 1,
					"patching_rect" : [ 300.461548, 284.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-18",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"ignoreclick" : 1,
					"presentation_rect" : [ 339.0, 17.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepTime",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
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
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "time"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setMonomeHeight",
					"numinlets" : 1,
					"patching_rect" : [ 1655.5, 446.847107, 139.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-8",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setMonomeWidth",
					"numinlets" : 1,
					"patching_rect" : [ 1442.0, 446.847107, 136.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 1,
					"id" : "obj-10",
					"outlettype" : [ "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"numinlets" : 1,
					"patching_rect" : [ 1704.0, 416.847107, 57.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-11",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 140.0, 47.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"numinlets" : 1,
					"patching_rect" : [ 1489.0, 416.847107, 55.0, 20.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-12",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 285.0, 119.0, 43.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepMonomeWidth",
					"numinlets" : 1,
					"patching_rect" : [ 1442.0, 416.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-13",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 339.0, 119.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepMonomeWidth",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 255.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "mWidth"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepMonomeHeight",
					"numinlets" : 1,
					"patching_rect" : [ 1655.5, 416.847107, 40.0, 17.0 ],
					"fontsize" : 12.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-14",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 339.0, 140.0, 54.0, 17.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepMonomeHeight",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 1,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 255.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 8.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "mHeight"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "griotspeak",
					"numinlets" : 1,
					"patching_rect" : [ 7.0, 7.847107, 63.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 0,
					"id" : "obj-50",
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route track scene time width clipLength top latest folding newNoteLength currentScaleName rootNote cycles newNoteVelocity monomeWidth monomeHeight followPlayingClip",
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 136.847107, 1773.0, 18.0 ],
					"fontsize" : 10.0,
					"numoutlets" : 17,
					"id" : "obj-19",
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
					"fontname" : "Arial Bold"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "scene\n",
					"numinlets" : 1,
					"patching_rect" : [ 170.0, 244.847107, 55.0, 24.0 ],
					"fontsize" : 15.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-23",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 85.0, 49.0, 55.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "track",
					"numinlets" : 1,
					"patching_rect" : [ 38.0, 244.847107, 50.0, 24.0 ],
					"fontsize" : 15.0,
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-37",
					"fontname" : "Arial Bold",
					"presentation_rect" : [ 17.0, 50.0, 47.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepScene",
					"numinlets" : 1,
					"patching_rect" : [ 121.666664, 284.847107, 60.0, 28.0 ],
					"fontsize" : 21.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-33",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 85.0, 71.233917, 60.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepScene",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "scene"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTrack",
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 284.847107, 60.0, 28.0 ],
					"fontsize" : 21.0,
					"numoutlets" : 2,
					"presentation" : 1,
					"id" : "obj-30",
					"parameter_enable" : 1,
					"outlettype" : [ "", "float" ],
					"presentation_rect" : [ 17.0, 72.233917, 60.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_modmax" : 127.0,
							"parameter_longname" : "#1ClipstepTrack",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 1,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : "",
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_invisible" : 2,
							"parameter_steps" : 2049,
							"parameter_annotation_name" : "",
							"parameter_exponent" : 1.0,
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "track"
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 382.0, 86.847107, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-32",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 9.0, 42.0, 144.0, 95.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 423.0, 86.847107, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-34",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 282.0, 112.0, 119.0, 53.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 464.0, 86.847107, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-56",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 282.0, 9.0, 119.0, 99.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 339.0, 86.847107, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-70",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 156.0, 112.0, 122.0, 53.0 ]
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"numinlets" : 1,
					"border" : 1,
					"patching_rect" : [ 295.0, 86.847107, 31.0, 15.0 ],
					"numoutlets" : 0,
					"presentation" : 1,
					"id" : "obj-71",
					"bgcolor" : [ 0.85098, 0.866667, 0.886275, 1.0 ],
					"presentation_rect" : [ 156.0, 9.0, 122.0, 99.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-56", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-34", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-32", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-70", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 0 ],
					"destination" : [ "obj-71", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-15", 2 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-14", 0 ],
					"destination" : [ "obj-8", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-8", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1665.0, 537.347107, 684.837158, 537.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-13", 0 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-10", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1451.5, 526.347107, 684.837158, 526.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 26.5, 456.847107, 684.837158, 456.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-5", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 309.961548, 456.847107, 684.837158, 456.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 662.65387, 452.847107, 684.837158, 452.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-45", 0 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-30", 0 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-18", 0 ],
					"destination" : [ "obj-5", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-36", 1 ],
					"destination" : [ "obj-49", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-49", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1212.076904, 443.347107, 684.837158, 443.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-54", 0 ],
					"destination" : [ "obj-24", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-57", 0 ],
					"destination" : [ "obj-43", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-60", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 917.115356, 494.847107, 684.837158, 494.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-53", 0 ],
					"destination" : [ "obj-60", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-24", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1298.807739, 506.847107, 684.837158, 506.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-43", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1426.038452, 506.847107, 684.837158, 506.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-20", 0 ],
					"destination" : [ "obj-83", 0 ],
					"hidden" : 0,
					"midpoints" : [ 408.192322, 316.347107, 408.192322, 316.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-83", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 408.192322, 514.347107, 684.837158, 514.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-33", 0 ],
					"destination" : [ "obj-3", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 131.166656, 456.847107, 684.837158, 456.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-69", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1044.346191, 506.847107, 684.837158, 506.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-59", 0 ],
					"destination" : [ "obj-69", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-44", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1553.269287, 506.847107, 684.837158, 506.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-67", 0 ],
					"destination" : [ "obj-44", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 14 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1561.25, 285.347107, 1665.0, 285.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 13 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1451.625, 285.347107, 1451.5, 285.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 4 ],
					"destination" : [ "obj-58", 0 ],
					"hidden" : 0,
					"midpoints" : [ 465.0, 199.347107, 535.423096, 199.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 11 ],
					"destination" : [ "obj-57", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1232.375, 219.347107, 1426.038452, 219.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 7 ],
					"destination" : [ "obj-53", 0 ],
					"hidden" : 0,
					"midpoints" : [ 793.875, 211.347107, 917.115356, 211.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 9 ],
					"destination" : [ "obj-36", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1013.125, 278.347107, 1171.576904, 278.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 2 ],
					"destination" : [ "obj-18", 0 ],
					"hidden" : 0,
					"midpoints" : [ 245.75, 219.347107, 309.961548, 219.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 1 ],
					"destination" : [ "obj-33", 0 ],
					"hidden" : 0,
					"midpoints" : [ 136.125, 284.847107, 131.166656, 284.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 0 ],
					"destination" : [ "obj-30", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 3 ],
					"destination" : [ "obj-20", 0 ],
					"hidden" : 0,
					"midpoints" : [ 355.375, 219.347107, 408.192322, 219.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 5 ],
					"destination" : [ "obj-45", 0 ],
					"hidden" : 0,
					"midpoints" : [ 574.625, 219.347107, 662.65387, 219.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 6 ],
					"destination" : [ "obj-39", 0 ],
					"hidden" : 0,
					"midpoints" : [ 684.25, 219.347107, 789.884644, 219.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 12 ],
					"destination" : [ "obj-67", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1342.0, 351.559875, 1553.269287, 351.559875 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 8 ],
					"destination" : [ "obj-59", 0 ],
					"hidden" : 0,
					"midpoints" : [ 903.5, 213.847107, 1044.346191, 213.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-55", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 10 ],
					"destination" : [ "obj-54", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1122.75, 183.347107, 1298.807739, 183.347107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 15 ],
					"destination" : [ "obj-6", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-6", 0 ],
					"destination" : [ "obj-7", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-7", 0 ],
					"destination" : [ "obj-51", 0 ],
					"hidden" : 0,
					"midpoints" : [ 1671.375, 502.847107, 684.837158, 502.847107 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-25", 0 ],
					"destination" : [ "obj-17", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ],
		"parameters" : 		{
			"obj-53" : [ "#1ClipstepFolding", "folding", 0 ],
			"obj-54" : [ "#1ClipstepRoot", "root", 1 ],
			"obj-45" : [ "#1ClipstepTopNote", "topNote", 0 ],
			"obj-18" : [ "#1ClipstepTime", "time", 0 ],
			"obj-25" : [ "clipstepCompile", "compile", 0 ],
			"obj-30" : [ "#1ClipstepTrack", "track", 0 ],
			"obj-33" : [ "#1ClipstepScene", "scene", 0 ],
			"obj-20" : [ "#1ClipstepWidth", "width", 0 ],
			"obj-57" : [ "#1ClipstepCycles", "cycles", 1 ],
			"obj-6" : [ "live.toggle", "live.toggle", 0 ],
			"obj-13" : [ "#1ClipstepMonomeWidth", "mWidth", 1 ],
			"obj-36" : [ "#1ClipstepScale", "scale", 0 ],
			"obj-59" : [ "#1ClipstepNoteLength", "length", 1 ],
			"obj-67" : [ "#1ClipstepVelocity", "velocity", 1 ],
			"obj-14" : [ "#1ClipstepMonomeHeight", "mHeight", 1 ],
			"obj-39" : [ "#1ClipstepLatest", "latest", 0 ]
		}

	}

}
