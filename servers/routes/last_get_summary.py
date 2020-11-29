import string
import json
import argparse


parser = argparse.ArgumentParser("Watch videos quickly")
parser.add_argument('-l', '--video-id', help="yt video link")
# parser.add_argument('-i', '--video-file', help="Input video file")
# parser.add_argument('-s', '--subtitles-file',
#                     help="Input subtitle file (srt)")
# parser.add_argument('-u', '--url', help="Video url", type=str)
# parser.add_argument('-k', '--keep-original-file',
#                     help="Keep original movie & subtitle file",
#                     action="store_true", default=False)

args = parser.parse_args()
video_link = "https://www.youtube.com/watch?v=" + args.video_id
filename = args.video_id

summary_filename = filename + ".json"
raw_filename = "raw_" + filename + ".json"



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
                timeline["value"] = summary
                timeline_list.append(timeline)
               
            raw_time = raw_time + 1

with open("summary_" + summary_filename, 'w') as outfile :
    json.dump(timeline_list, outfile)





        



   