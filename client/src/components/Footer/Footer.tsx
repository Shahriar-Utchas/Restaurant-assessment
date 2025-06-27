"use client";

import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
    <footer className="bg-[#880808] text-white pt-16 text-sm ">
      <div className="max-w-7xl mx-auto px-4 md:px-40 md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">RESTAURANT</h2>
            <p>Subscribe our newsletter and <br />get discount 25%off</p>
            <form className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-4 py-2 rounded-l text-black text-sm bg-white"
              />
              <button
                type="submit"
                className="bg-[#A52A2A] px-3 rounded-r flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex gap-3 text-white pt-2">
              <Twitter className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Facebook className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Instagram className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
              <Youtube className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Contact us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                <p>3517 W. Gray St. Utica, Pennsylvania 57867</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <p>(480) 555-0103</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <p>M.Alyaqout@4house.Co</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <p>Sun - Sat / 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-300">About us</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Our Menu</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Team</Link></li>
              <li><Link href="#" className="hover:text-gray-300">FAQ</Link></li>
            </ul>
          </div>

          {/* Instagram Gallery */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Instagram Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
                "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
                "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
                "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
                "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
                "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
              ].map((src, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded">
                  <Image
                    width={100}
                    height={100}
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#A52A2A] text-sm mt-10 md:px-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2025. All rights reserved</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300">Term of Use</Link>
            <Link href="#" className="hover:text-gray-300">Partner</Link>
          </div>
        </div>
      </div>

    </footer>
    
    </>
    
  );
}
