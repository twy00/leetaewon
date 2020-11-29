import string
import json
import argparse
import sys

videoid = sys.argv[1]

video_link = "https://www.youtube.com/watch?v=" + videoid
filename = videoid

summary_filename = "data/summary/" + filename + ".json"
raw_filename = "data/rawjson/" + filename + ".json"

with open(summary_filename, 'r') as summary_file, open(raw_filename, 'r') as raw_file :
    raw_data = json.load(raw_file)
    summary_data = json.load(summary_file) 

    raw_time = 0
    timeline_list = []
    

    for summary_time in range(len(summary_data)) :
        sum_start_time = summary_data[summary_time]["start"]
        sum_end_time = summary_data[summary_time]["end"]

        timeline = {}
        cont = True
        # raw_time = 0
        summary = ""

        while cont :
            raw_start_time = float(raw_data[raw_time]["start"])
            raw_duration = float(raw_data[raw_time]["dur"])
            raw_text = raw_data[raw_time]["text"]
            raw_end_time = raw_start_time + raw_duration

            # if sum_start_time <= raw_start_time and raw_end_time <= sum_end_time :
            if sum_start_time <= raw_start_time <= sum_end_time :
                summary = summary + raw_text

            elif sum_end_time < raw_start_time :
                cont = False
                sum_start_time_min = int(sum_start_time // 60)
                sum_start_time_sec = int(sum_start_time % 60)
                if len(str(sum_start_time_sec)) == 1 :
                    sum_start_time_sec = str(0)+str(sum_start_time_sec)
                sum_start = str(sum_start_time_min) + ":" + str(sum_start_time_sec)
                
                timeline["start_min"] = sum_start
                timeline["start_sec"] = sum_start_time
                timeline["value"] = "..." +  summary + "..."
                timeline_list.append(timeline)
               
            raw_time = raw_time + 1

with open("data/summary_text/" + videoid + ".json", 'w') as outfile :
    json.dump(timeline_list, outfile)





        



   