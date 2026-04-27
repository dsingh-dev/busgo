import bcrypt from "bcrypt";
import { prisma } from "../../src/lib/prisma";

async function main() {
  const hash = (plain: string) => bcrypt.hash(plain, 10);

  await prisma.booking.deleteMany();
  await prisma.bus.deleteMany();
  await prisma.user.deleteMany();

  // 👉 Create Users (passwords must be bcrypt-hashed to match /api/auth/login)
  const user1 = await prisma.user.create({
    data: {
      name: "Dharmu",
      email: "dharmu@example.com",
      password: await hash("123456"),
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "John",
      email: "john@example.com",
      password: await hash("password"),
      role: "ADMIN",
    },
  });

  const amenities = [
    "WIFI",
    "CHARGING_PORT",
    "BLANKET",
    "WATER_BOTTLE",
    "MEAL",
    "TV",
  ];

  for (const name of amenities) {
    await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  await prisma.city.createMany({
    data: [
      // --- North India ---
      { name: "Jaipur", state: "Rajasthan" },
      { name: "Udaipur", state: "Rajasthan" },
      { name: "Jodhpur", state: "Rajasthan" },
      { name: "Jaisalmer", state: "Rajasthan" },
      { name: "Pushkar", state: "Rajasthan" },

      { name: "Shimla", state: "Himachal Pradesh" },
      { name: "Manali", state: "Himachal Pradesh" },
      { name: "Dharamshala", state: "Himachal Pradesh" },
      { name: "Dalhousie", state: "Himachal Pradesh" },
      { name: "Kullu", state: "Himachal Pradesh" },

      { name: "Rishikesh", state: "Uttarakhand" },
      { name: "Haridwar", state: "Uttarakhand" },
      { name: "Nainital", state: "Uttarakhand" },
      { name: "Mussoorie", state: "Uttarakhand" },
      { name: "Dehradun", state: "Uttarakhand" },

      { name: "Agra", state: "Uttar Pradesh" },
      { name: "Varanasi", state: "Uttar Pradesh" },
      { name: "Lucknow", state: "Uttar Pradesh" },
      { name: "Mathura", state: "Uttar Pradesh" },
      { name: "Prayagraj", state: "Uttar Pradesh" },

      { name: "Amritsar", state: "Punjab" },
      { name: "Ludhiana", state: "Punjab" },
      { name: "Patiala", state: "Punjab" },

      { name: "Srinagar", state: "Jammu & Kashmir" },
      { name: "Gulmarg", state: "Jammu & Kashmir" },
      { name: "Pahalgam", state: "Jammu & Kashmir" },
      { name: "Leh", state: "Ladakh" },

      // --- West & Central India ---
      { name: "Mumbai", state: "Maharashtra" },
      { name: "Pune", state: "Maharashtra" },
      { name: "Mahabaleshwar", state: "Maharashtra" },
      { name: "Nashik", state: "Maharashtra" },
      { name: "Aurangabad", state: "Maharashtra" },

      { name: "Ahmedabad", state: "Gujarat" },
      { name: "Surat", state: "Gujarat" },
      { name: "Dwarka", state: "Gujarat" },
      { name: "Somnath", state: "Gujarat" },
      { name: "Bhuj", state: "Gujarat" },

      { name: "Panaji", state: "Goa" },
      { name: "Calangute", state: "Goa" },
      { name: "Margao", state: "Goa" },

      { name: "Indore", state: "Madhya Pradesh" },
      { name: "Bhopal", state: "Madhya Pradesh" },
      { name: "Gwalior", state: "Madhya Pradesh" },
      { name: "Ujjain", state: "Madhya Pradesh" },
      { name: "Khajuraho", state: "Madhya Pradesh" },

      // --- South India ---
      { name: "Bengaluru", state: "Karnataka" },
      { name: "Mysuru", state: "Karnataka" },
      { name: "Hampi", state: "Karnataka" },
      { name: "Gokarna", state: "Karnataka" },
      { name: "Coorg", state: "Karnataka" },

      { name: "Kochi", state: "Kerala" },
      { name: "Munnar", state: "Kerala" },
      { name: "Alleppey", state: "Kerala" },
      { name: "Thiruvananthapuram", state: "Kerala" },
      { name: "Wayanad", state: "Kerala" },

      { name: "Chennai", state: "Tamil Nadu" },
      { name: "Madurai", state: "Tamil Nadu" },
      { name: "Ooty", state: "Tamil Nadu" },
      { name: "Kanyakumari", state: "Tamil Nadu" },
      { name: "Rameswaram", state: "Tamil Nadu" },

      { name: "Hyderabad", state: "Telangana" },
      { name: "Warangal", state: "Telangana" },
      { name: "Nizamabad", state: "Telangana" },

      { name: "Visakhapatnam", state: "Andhra Pradesh" },
      { name: "Tirupati", state: "Andhra Pradesh" },
      { name: "Vijayawada", state: "Andhra Pradesh" },

      // --- East & North East India ---
      { name: "Kolkata", state: "West Bengal" },
      { name: "Darjeeling", state: "West Bengal" },
      { name: "Siliguri", state: "West Bengal" },
      { name: "Digha", state: "West Bengal" },

      { name: "Puri", state: "Odisha" },
      { name: "Bhubaneswar", state: "Odisha" },
      { name: "Konark", state: "Odisha" },

      { name: "Patna", state: "Bihar" },
      { name: "Gaya", state: "Bihar" },
      { name: "Nalanda", state: "Bihar" },

      { name: "Gangtok", state: "Sikkim" },
      { name: "Pelling", state: "Sikkim" },
      { name: "Lachung", state: "Sikkim" },

      { name: "Guwahati", state: "Assam" },
      { name: "Kaziranga", state: "Assam" },
      { name: "Jorhat", state: "Assam" },

      { name: "Shillong", state: "Meghalaya" },
      { name: "Cherrapunji", state: "Meghalaya" },
      { name: "Dawki", state: "Meghalaya" }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });