
    if request.method == 'REMOVE':
        print("kobe");
        id_toRemove = request.data;
        print (id_toRemove);
        for log_entry in comments:
            if(log_entry.id == id_toRemove):
                comments.remove(id_toRemove);
                break;

        with open('comments.json', 'w') as f:
            f.write(json.dumps(comments, indent=4, separators=(',', ': ')))
