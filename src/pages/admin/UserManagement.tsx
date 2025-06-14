import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, Shield, Trash2 } from "lucide-react";

interface NewUserData {
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

interface PasswordValidation {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Hoisted Modal component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const UserManagement: React.FC = () => {
  const { users, fetchAllUsers, addUser, updateUserRole, deleteUser } =
    useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    role: "ADMIN" | "USER";
  } | null>(null);
  const [formData, setFormData] = useState<NewUserData>({
    email: "",
    password: "",
    name: "",
    role: "USER",
  });
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const validatePassword = (password: string) => {
    setPasswordValidation({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every((value) => value === true);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      toast.error("Please ensure password meets all requirements");
      return;
    }
    setIsLoading(true);
    try {
      await addUser(formData);
      toast.success("User added successfully");
      setShowAddUser(false);
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "USER",
      });
      await fetchAllUsers();
    } catch (err) {
      console.error("Failed to add user:", err);
      toast.error("Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await updateUserRole(
        selectedUser.id,
        selectedUser.role === "ADMIN" ? "USER" : "ADMIN"
      );
      toast.success("User role updated successfully");
      setShowRoleModal(false);
      await fetchAllUsers();
    } catch (err) {
      console.error("Failed to update user role:", err);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      await fetchAllUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Modal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        title="Add New User"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter user's full name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter user's email"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter user's password"
              className="w-full p-2 border rounded"
            />
            <div className="mt-2 text-sm space-y-1">
              <p
                className={
                  passwordValidation.hasMinLength
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                • At least 8 characters long
              </p>
              <p
                className={
                  passwordValidation.hasUpperCase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                • Contains uppercase letter
              </p>
              <p
                className={
                  passwordValidation.hasLowerCase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                • Contains lowercase letter
              </p>
              <p
                className={
                  passwordValidation.hasNumber
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                • Contains number
              </p>
              <p
                className={
                  passwordValidation.hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                • Contains special character
              </p>
            </div>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddUser(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Change User Role"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to change {selectedUser?.name}'s role to{" "}
            {selectedUser?.role === "ADMIN" ? "User" : "Admin"}? This will
            affect their permissions and access levels.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRoleModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRoleUpdate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Change Role
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete {selectedUser?.name}? This action
            cannot be undone. All associated data will be permanently removed.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : user.status === "SUSPENDED"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser({
                            id: user.id!,
                            name: user.name!,
                            role: user.role as "ADMIN" | "USER",
                          });
                          setShowRoleModal(true);
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Change to {user.role === "ADMIN" ? "User" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser({
                            id: user.id!,
                            name: user.name!,
                            role: user.role as "ADMIN" | "USER",
                          });
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
