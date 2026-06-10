"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  visitReason?: string;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  expectedDeposit: number;
  date: string;
  time: string;
  paymentMethod: string;
}) {
  try {
    const status = data.paymentMethod === 'TRANSFER' ? 'PENDING' : 'APPROVED';
    
    const booking = await prisma.booking.create({
      data: {
        ...data,
        status,
      },
    });

    revalidatePath('/dashboard/pagos');
    return { success: true, id: booking.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function getPendingBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { success: true, data: bookings };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { success: false, data: [] };
  }
}

export async function updateBookingStatus(id: string, status: 'APPROVED' | 'REJECTED', rejectReason?: string) {
  try {
    await prisma.booking.update({
      where: { id },
      data: {
        status,
        rejectReason: rejectReason || null,
      },
    });

    revalidatePath('/dashboard/pagos');
    return { success: true };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
