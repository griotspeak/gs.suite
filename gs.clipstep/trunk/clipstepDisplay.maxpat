{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 0.0, 44.0, 1280.0, 1126.0 ],
		"bglocked" : 0,
		"defrect" : [ 0.0, 44.0, 1280.0, 1126.0 ],
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
					"maxclass" : "comment",
					"text" : "follow",
					"fontsize" : 12.0,
					"presentation_rect" : [ 11.0, 141.0, 47.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 20.0, 140.0, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-9",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "fold",
					"fontsize" : 12.0,
					"presentation_rect" : [ 165.0, 79.0, 47.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 920.0, 249.0, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-1",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setFollowPlayingClip",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1661.875, 223.847107, 153.0, 18.0 ],
					"id" : "obj-7",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "live.toggle",
					"outlettype" : [ "" ],
					"presentation_rect" : [ 59.875, 141.0, 17.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1661.875, 187.0, 15.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-6",
					"parameter_enable" : 1,
					"numoutlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "live.toggle",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_enum" : [ "off", "on" ],
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTime",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 300.461548, 348.847107, 90.0, 18.0 ],
					"id" : "obj-5",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTopNote",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 653.15387, 348.847107, 107.0, 18.0 ],
					"id" : "obj-4",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setClipSceneFromPatcher",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 121.666664, 348.847107, 177.0, 18.0 ],
					"id" : "obj-3",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setTrack",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 348.847107, 93.0, 18.0 ],
					"id" : "obj-2",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setWidth",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 398.692322, 348.847107, 95.0, 18.0 ],
					"id" : "obj-83",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "r ---toHUD",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"color" : [ 0.960784, 0.439216, 0.478431, 1.0 ],
					"numinlets" : 0,
					"patching_rect" : [ 17.0, 35.847107, 58.0, 18.0 ],
					"id" : "obj-55",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setFolding",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 907.615356, 348.847107, 103.0, 18.0 ],
					"id" : "obj-60",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "velocity",
					"fontsize" : 12.0,
					"presentation_rect" : [ 165.0, 138.0, 56.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1564.78894, 244.847107, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-74",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "length",
					"fontsize" : 12.0,
					"presentation_rect" : [ 165.0, 117.0, 49.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1057.708496, 244.847107, 55.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-75",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepVelocity",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 220.0, 138.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1543.769287, 284.847107, 40.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-67",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 96 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "velocity",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepNoteLength",
					"prototypename" : "clipstep.noteLength",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 220.0, 117.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1034.846191, 284.847107, 40.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-59",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 0.03125 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "length",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "s ---toJS",
					"fontsize" : 10.0,
					"color" : [ 0.756863, 0.329412, 0.843137, 1.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 675.337158, 547.847107, 50.0, 18.0 ],
					"id" : "obj-51",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setCycles",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1416.538452, 348.847107, 99.0, 18.0 ],
					"id" : "obj-43",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setRootNote",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1289.307739, 244.847107, 112.0, 18.0 ],
					"id" : "obj-24",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setNewNoteLength",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1034.846191, 348.847107, 143.0, 18.0 ],
					"id" : "obj-69",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "cycles",
					"fontsize" : 12.0,
					"presentation_rect" : [ 165.0, 58.0, 47.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1437.0, 244.847107, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-64",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "root",
					"fontsize" : 12.0,
					"presentation_rect" : [ 165.0, 37.0, 47.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1314.0, 179.847107, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-63",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepCycles",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 220.0, 58.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1416.538452, 284.847107, 40.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-57",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 64.0,
							"parameter_mmin" : 1.0,
							"parameter_initial" : [ 4 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "cycles",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepRoot",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 220.0, 37.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1289.307739, 212.847107, 44.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-54",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 60 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "root",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.toggle",
					"varname" : "#1ClipstepFolding",
					"outlettype" : [ "" ],
					"presentation_rect" : [ 220.0, 79.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 908.115356, 284.847107, 15.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-53",
					"parameter_enable" : 1,
					"numoutlets" : 1,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 1.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "folding",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_enum" : [ "off", "on" ],
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setCurrentScaleWithSymbol",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1202.576904, 348.847107, 187.0, 18.0 ],
					"id" : "obj-49",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.menu",
					"varname" : "#1ClipstepScale",
					"outlettype" : [ "", "", "float" ],
					"presentation_rect" : [ 171.0, 15.0, 100.0, 15.0 ],
					"numinlets" : 1,
					"pictures" : [  ],
					"patching_rect" : [ 1162.076904, 284.847107, 100.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-36",
					"parameter_enable" : 1,
					"numoutlets" : 3,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 2,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "scale",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_enum" : [ "Drums", "_", "Major", "NaturalMinor", "HarmonicMinor", "Chromatic", "___", "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian", "___", "MinorPentatonic", "MajorPentatonic", "BluePentatonic", "____", "WholeTone", "WholeHalfDiminished", "HalfWholeDiminished", "SymmetricalAugmented", "Tritone", "_____", "MajorQuartal", "MinorQuartal" ],
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setNewNoteVelocity",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1543.769287, 348.847107, 148.0, 18.0 ],
					"id" : "obj-44",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "latest",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 78.0, 64.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 799.0, 244.847107, 62.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-31",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepLatest",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 78.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 780.384644, 284.847107, 44.0, 17.0 ],
					"ignoreclick" : 1,
					"presentation" : 1,
					"id" : "obj-39",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "latest",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "0 measures",
					"linecount" : 3,
					"fontsize" : 15.0,
					"presentation_rect" : [ 17.0, 102.0, 131.0, 24.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 525.923096, 244.847107, 78.0, 58.0 ],
					"presentation" : 1,
					"id" : "obj-58",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "top note ",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 57.0, 59.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 670.0, 244.847107, 61.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-46",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTopNote",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 57.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 653.15387, 284.847107, 43.0, 17.0 ],
					"ignoreclick" : 1,
					"presentation" : 1,
					"id" : "obj-45",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 8,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "topNote",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 36.0, 46.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 417.0, 244.847107, 40.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-28",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "begin",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 15.0, 43.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 286.0, 244.847107, 46.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-29",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepWidth",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 36.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 398.692322, 284.847107, 40.0, 17.0 ],
					"ignoreclick" : 1,
					"presentation" : 1,
					"id" : "obj-20",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "width",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTime",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 15.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 300.461548, 284.847107, 40.0, 17.0 ],
					"ignoreclick" : 1,
					"presentation" : 1,
					"id" : "obj-18",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 1,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "time",
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
							"parameter_steps" : 0,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setMonomeHeight",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1655.5, 446.847107, 139.0, 18.0 ],
					"id" : "obj-8",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend setMonomeWidth",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 1442.0, 446.847107, 136.0, 18.0 ],
					"id" : "obj-10",
					"fontname" : "Arial Bold",
					"numoutlets" : 1
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "height",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 138.0, 47.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1704.0, 416.847107, 57.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-11",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "width",
					"fontsize" : 12.0,
					"presentation_rect" : [ 288.0, 117.0, 43.0, 20.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1489.0, 416.847107, 55.0, 20.0 ],
					"presentation" : 1,
					"id" : "obj-12",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepMonomeWidth",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 117.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1442.0, 416.847107, 40.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-13",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 255.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 8 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "mWidth",
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
							"parameter_steps" : 2049,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepMonomeHeight",
					"outlettype" : [ "", "float" ],
					"fontsize" : 12.0,
					"presentation_rect" : [ 342.0, 138.0, 54.0, 17.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1655.5, 416.847107, 40.0, 17.0 ],
					"presentation" : 1,
					"id" : "obj-14",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 255.0,
							"parameter_mmin" : 0.0,
							"parameter_initial" : [ 8.0 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "mHeight",
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
							"parameter_steps" : 2049,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "griotspeak",
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 4.0, 660.847107, 63.0, 18.0 ],
					"id" : "obj-50",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "route track scene time width clipLength top latest folding newNoteLength currentScaleName rootNote cycles newNoteVelocity monomeWidth monomeHeight followPlayingClip",
					"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 136.847107, 1773.0, 18.0 ],
					"id" : "obj-19",
					"fontname" : "Arial Bold",
					"numoutlets" : 17
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "scene\n",
					"fontsize" : 15.0,
					"presentation_rect" : [ 87.0, 46.0, 55.0, 24.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 170.0, 244.847107, 55.0, 24.0 ],
					"presentation" : 1,
					"id" : "obj-23",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "comment",
					"text" : "track",
					"fontsize" : 15.0,
					"presentation_rect" : [ 19.0, 47.0, 47.0, 24.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 38.0, 244.847107, 50.0, 24.0 ],
					"presentation" : 1,
					"id" : "obj-37",
					"fontname" : "Arial Bold",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepScene",
					"outlettype" : [ "", "float" ],
					"fontsize" : 21.0,
					"presentation_rect" : [ 87.0, 68.233917, 60.0, 28.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 121.666664, 284.847107, 60.0, 28.0 ],
					"presentation" : 1,
					"id" : "obj-33",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "scene",
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
							"parameter_steps" : 2049,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "live.numbox",
					"varname" : "#1ClipstepTrack",
					"outlettype" : [ "", "float" ],
					"fontsize" : 21.0,
					"presentation_rect" : [ 19.0, 69.233917, 60.0, 28.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 17.0, 284.847107, 60.0, 28.0 ],
					"presentation" : 1,
					"id" : "obj-30",
					"parameter_enable" : 1,
					"numoutlets" : 2,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 0,
							"parameter_mmax" : 2048.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "track",
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
							"parameter_steps" : 2049,
							"parameter_invisible" : 2,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : ""
						}

					}

				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 11.0, 39.0, 144.0, 95.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1016.0, 56.847107, 31.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-32",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 285.0, 110.0, 119.0, 53.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1057.0, 56.847107, 31.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-34",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 285.0, 7.0, 119.0, 99.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 1098.0, 56.847107, 31.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-56",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 159.0, 110.0, 122.0, 53.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 973.0, 56.847107, 31.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-70",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "panel",
					"border" : 1,
					"bgcolor" : [ 0.666667, 0.698039, 0.717647, 1.0 ],
					"presentation_rect" : [ 159.0, 7.0, 122.0, 99.0 ],
					"numinlets" : 1,
					"patching_rect" : [ 929.0, 56.847107, 31.0, 15.0 ],
					"presentation" : 1,
					"id" : "obj-71",
					"numoutlets" : 0
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"outlettype" : [ "" ],
					"numinlets" : 0,
					"patching_rect" : [ 1054.800049, 21.0, 25.0, 25.0 ],
					"id" : "obj-90",
					"numoutlets" : 1,
					"comment" : ""
				}

			}
 ],
		"lines" : [ 			{
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
					"source" : [ "obj-90", 0 ],
					"destination" : [ "obj-32", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-90", 0 ],
					"destination" : [ "obj-71", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-90", 0 ],
					"destination" : [ "obj-34", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-90", 0 ],
					"destination" : [ "obj-70", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-90", 0 ],
					"destination" : [ "obj-56", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
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
 ],
		"parameters" : 		{
			"obj-53" : [ "#1ClipstepFolding", "folding", 0 ],
			"obj-6" : [ "live.toggle", "live.toggle", 0 ],
			"obj-57" : [ "#1ClipstepCycles", "cycles", 1 ],
			"obj-59" : [ "#1ClipstepNoteLength", "length", 1 ],
			"obj-36" : [ "#1ClipstepScale", "scale", 0 ],
			"obj-18" : [ "#1ClipstepTime", "time", 0 ],
			"obj-13" : [ "#1ClipstepMonomeWidth", "mWidth", 1 ],
			"obj-67" : [ "#1ClipstepVelocity", "velocity", 1 ],
			"obj-45" : [ "#1ClipstepTopNote", "topNote", 0 ],
			"obj-14" : [ "#1ClipstepMonomeHeight", "mHeight", 1 ],
			"obj-54" : [ "#1ClipstepRoot", "root", 1 ],
			"obj-39" : [ "#1ClipstepLatest", "latest", 0 ],
			"obj-20" : [ "#1ClipstepWidth", "width", 0 ],
			"obj-33" : [ "#1ClipstepScene", "scene", 0 ],
			"obj-30" : [ "#1ClipstepTrack", "track", 0 ]
		}

	}

}
