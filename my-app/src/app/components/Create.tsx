import Link from "next/link";

const Create: React.FC = () => {
    return (
      <div className="flex justify-center items-center">
        <div
          className="relative bg-cover bg-center rounded-lg p-6 md:p-12 lg:p-16 flex flex-col justify-center text-white w-[800px]"
          style={{
            backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20230715/pngtree-d-rendering-of-a-relaxed-brunette-man-working-from-home-on-image_3850186.jpg)`,
            height: '240px',
          }}
        >
          {/* Gradient overlay */}
          <div className="bg-gradient-to-r from-purple-500 to-transparent absolute inset-0 rounded-lg"></div>
  
          <div className="relative z-10">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 lg:mb-6">
              Find Your Next High Paying Crypto Gig
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6">
              Participate in bounties or apply to freelance gigs of world-class crypto companies, all with a single profile.
            </p>
  
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Sign Up Button */}
              <Link href="/post" className="bg-white text-purple-600 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-gray-200">
                Post Bounty
              </Link>
  
              {/* User avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYZILizgcx9X9xV6hXoEVAugYoCw_N-Cz-I1avAkwSjupCIu_vUphg8o2iOI0hDbhCF4&usqp=CAU"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
                    alt="User Avatar"
                  />
                  <img
                    src="https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13626.jpg"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
                    alt="User Avatar"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTs4lns7y-RhqYN7YaigGkDIxqSGScRoXLQ&s"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
                    alt="User Avatar"
                  />
                </div>
                <span className="ml-4 text-sm md:text-base lg:text-lg text-white">
                  Join 44,600+ others
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Create;
  