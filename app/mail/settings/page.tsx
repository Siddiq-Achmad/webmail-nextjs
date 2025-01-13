"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Save, TestTube } from "lucide-react";

export default function SettingsPage() {
  const [smtpSettings, setSmtpSettings] = useState({
    host: "",
    port: "587",
    username: "",
    password: "",
    encryption: "tls",
    useAuth: true,
  });

  const [generalSettings, setGeneralSettings] = useState({
    displayName: "John Doe",
    emailSignature: "",
    enableNotifications: true,
    darkMode: false,
    autoSaveInterval: "5",
  });

  const handleSmtpTest = async () => {
    // Implement SMTP test logic
    console.log("Testing SMTP connection...");
  };

  const handleSaveSettings = async () => {
    // Implement settings save logic
    console.log("Saving settings...", { smtpSettings, generalSettings });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your email client preferences and server settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="smtp">SMTP Server</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your basic preferences and display options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={generalSettings.displayName}
                  onChange={(e) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailSignature">Email Signature</Label>
                <textarea
                  id="emailSignature"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                  value={generalSettings.emailSignature}
                  onChange={(e) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      emailSignature: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications for new emails
                  </div>
                </div>
                <Switch
                  checked={generalSettings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      enableNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoSave">Auto-save Interval (minutes)</Label>
                <Select
                  value={generalSettings.autoSaveInterval}
                  onValueChange={(value) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      autoSaveInterval: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Every minute</SelectItem>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="10">Every 10 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Server Configuration</CardTitle>
              <CardDescription>
                Configure your outgoing mail server settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    placeholder="smtp.example.com"
                    value={smtpSettings.host}
                    onChange={(e) =>
                      setSmtpSettings((prev) => ({
                        ...prev,
                        host: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={smtpSettings.port}
                    onChange={(e) =>
                      setSmtpSettings((prev) => ({
                        ...prev,
                        port: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption">Encryption</Label>
                <Select
                  value={smtpSettings.encryption}
                  onValueChange={(value) =>
                    setSmtpSettings((prev) => ({
                      ...prev,
                      encryption: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ssl">SSL/TLS</SelectItem>
                    <SelectItem value="tls">STARTTLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable SMTP authentication
                  </div>
                </div>
                <Switch
                  checked={smtpSettings.useAuth}
                  onCheckedChange={(checked) =>
                    setSmtpSettings((prev) => ({
                      ...prev,
                      useAuth: checked,
                    }))
                  }
                />
              </div>

              {smtpSettings.useAuth && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={smtpSettings.username}
                      onChange={(e) =>
                        setSmtpSettings((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={smtpSettings.password}
                      onChange={(e) =>
                        setSmtpSettings((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleSmtpTest}>
                  <TestTube className="mr-2 h-4 w-4" />
                  Test Connection
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
