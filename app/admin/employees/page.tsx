"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import { useState } from "react";

export default function Employees() {
  const employees = useQuery(api.users.employees);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Employees</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{getPrettyRoleName(employee.role ?? "")}</TableCell>
              <TableCell className="flex flex-row gap-2 justify-end">
                <EditEmployeeDialog userId={employee._id} />
                <Button variant={"destructive"}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function getPrettyRoleName(input: string) {
  switch (input) {
    case "admin":
      return "Admin";
    case "community_assistant":
      return "Community Assistant";
    case "hall_director":
      return "Hall Director";
    case "night_monitor":
      return "Night Monitor";
    default:
      return "null";
  }
}

function EditEmployeeDialog({ userId }: { userId: string }) {
  const user = useQuery(api.users.getUser, { userId });

  const updateRole = useMutation(api.users.modifyUserRole);
  const [role, setRole] = useState<
    "admin" | "hall_director" | "community_assistant" | "night_monitor"
  >(user?.role ?? "night_monitor");

  if (!user) {
    return;
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Modify employee permissions.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`${user?._id}_email`}>Email</Label>
              <Input
                disabled
                id={`${user?._id}_email`}
                name={`${user?._id}_email`}
                defaultValue={user?.email}
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="justify-between" variant="outline">
                    <Label>
                      <ChevronDown />
                      {getPrettyRoleName(role)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-start">
                    Select a Role
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={role}
                    onValueChange={(value) => {
                      setRole(
                        value == "admin"
                          ? "admin"
                          : value == "hall_director"
                            ? "hall_director"
                            : value == "community_assistant"
                              ? "community_assistant"
                              : "night_monitor",
                      );
                    }}
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="hall_director">
                      Hall Director
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="community_assistant">
                      Community Assistant
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="night_monitor">
                      Night Desk Monitor
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  updateRole({
                    userId: user._id,
                    newRole: role,
                  });
                }}
                type="submit"
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
