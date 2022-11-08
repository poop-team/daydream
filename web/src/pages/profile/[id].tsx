/*export const staticPath = async () => {
  const res = await fetch("http://localhost:3000/profile"); // todo: user data?
  const data = await res.json();

  const paths = data.map((profile) => {
    return {
      params: { id: profile.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const staticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:3000/profile" + id);
  const data = await res.json();

  return {
    props: { profile: data },
  };
};

const ProfileRoute = ({ profile}) => {
  return <div>
    {/!* profile.id*!/}
  </div>;
};*/

const ProfileRoute = () => {
  return <div></div>;
};

export default ProfileRoute;
