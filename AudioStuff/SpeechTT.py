import speech_recognition as sr

def getText(file1):
	r = sr.Recognizer()
	with sr.WavFile(file1) as source:
	    audio = r.record(source)                        # extract audio data from the file

	try:
	    list = r.recognize(audio,True)
	    for prediction in list:
	        return (prediction["text"])
	except LookupError:                                 # speech is unintelligible
	    return("Could not understand audio")