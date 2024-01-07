class DfWrapper:
    def __init__(self) -> None:
        self.idea_df = None
        
    def set_df(self, df):
        self.idea_df = df
        
    def get_df(self):
        return self.idea_df
        