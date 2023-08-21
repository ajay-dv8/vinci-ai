import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;


superbase
pass:1stRichKid5544,

service-role-secrete:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcGdmenZ0cHVib3pkdnFuYmdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODI4Njk2NywiZXhwIjoyMDAzODYyOTY3fQ.gOwbBdbWaoQVF0NQj0k3irHxB4PjRR5mKetHmJqDLkI

anon-public:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcGdmenZ0cHVib3pkdnFuYmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyODY5NjcsImV4cCI6MjAwMzg2Mjk2N30.Eq11bMXVG-x4FRBP_YEDrrVnQ9p-lIZ8JJt3TElTQm4,

ref is:eepgfzvtpubozdvqnbge

postgress-con-string:postgres://postgres:[YOUR-PASSWORD]@db.eepgfzvtpubozdvqnbge.supabase.co:6543/postgres
