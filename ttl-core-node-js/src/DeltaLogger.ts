class DeltaLogger {

    deltaList: Array<string>;

    public pop() {
        if (this.deltaList.length > 0) {
            var r = this.deltaList[0];
            this.deltaList.splice(0, 1);
            return r;
        } else {
            return null;
        }
    }

    public enqueue(delta: string) {
        this.deltaList.push(delta);
    }
}

export = DeltaLogger;